import Joi from 'joi'; // Biblioteca para validação de dados
import logger from '../utils/logger.js'; // Logger customizado

// Array que armazena as tarefas em memória
let tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: new Date().toISOString(), // Data de criação
    completedAt: null, // Data de conclusão
    priority: 'media', // Prioridade padrão
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    priority: 'media',
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    priority: 'media',
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Description 4',
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    priority: 'media',
  },
];

// Variável para controlar o próximo id único
let nextId = 5; // Próximo ID para nova tarefa

// Esquema de validação Joi para criação de tarefa
const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'O campo title é obrigatório.',
    'any.required': 'O campo title é obrigatório.',
  }),
  description: Joi.string().allow('').default(''), // Descrição opcional
  priority: Joi.string().valid('baixa', 'media', 'alta').default('media'), // Prioridade
});

// Esquema de validação Joi para atualização de tarefa
const updateTaskSchema = Joi.object({
  title: Joi.string(), // Título opcional
  description: Joi.string().allow(''), // Descrição opcional
  completed: Joi.boolean(), // Status opcional
  priority: Joi.string().valid('baixa', 'media', 'alta'), // Prioridade opcional
});

// Retorna todas as tarefas com filtros, busca e paginação
export function getAllTasks(req, res) {
  let result = [...tasks]; // Copia o array para aplicar filtros

  // Filtro por status (completed=true|false)
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    result = result.filter((t) => t.completed === completed);
  }

  // Busca por palavra-chave no título ou descrição
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search)
    );
  }

  // Paginação
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginated,
  });
}

// Cria uma nova tarefa
export function createTask(req, res) {
  const { error, value } = createTaskSchema.validate(req.body); // Valida dados
  if (error) return res.status(400).json({ error: error.details[0].message }); // Erro de validação
  const newTask = {
    id: nextId++, // Gera novo ID
    title: value.title, // Título da tarefa
    description: value.description, // Descrição da tarefa
    completed: false, // Nova tarefa começa como não concluída
    createdAt: new Date().toISOString(), // Data de criação
    completedAt: null, // Ainda não concluída
    priority: value.priority, // Prioridade
  };
  tasks.push(newTask); // Adiciona ao array
  logger.info(`Tarefa criada: ${JSON.stringify(newTask)}`); // Loga criação
  res.status(201).json(newTask); // Retorna tarefa criada
}

// Atualiza uma tarefa (title, description, completed, priority)
export function updateTask(req, res) {
  const { id } = req.params; // ID da tarefa
  const { error, value } = updateTaskSchema.validate(req.body); // Valida dados
  if (error) return res.status(400).json({ error: error.details[0].message }); // Erro de validação
  const task = tasks.find((t) => t.id === parseInt(id)); // Busca tarefa
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' }); // Não achou
  if (value.title !== undefined) task.title = value.title; // Atualiza título
  if (value.description !== undefined) task.description = value.description; // Atualiza descrição
  if (value.completed !== undefined) {
    // Se mudou completed para true e estava false, define completedAt
    if (value.completed && !task.completed) {
      task.completedAt = new Date().toISOString();
    }
    // Se mudou completed para false, reseta completedAt
    if (!value.completed && task.completed) {
      task.completedAt = null;
    }
    task.completed = value.completed; // Atualiza status
  }
  if (value.priority !== undefined) task.priority = value.priority; // Atualiza prioridade
  logger.info(`Tarefa atualizada: ${JSON.stringify(task)}`); // Loga atualização
  res.json(task); // Retorna tarefa atualizada
}

// Remove uma tarefa pelo id
export function deleteTask(req, res) {
  const { id } = req.params; // ID da tarefa
  const exists = tasks.some((t) => t.id === parseInt(id)); // Verifica existência
  if (!exists) return res.status(404).json({ error: 'Tarefa não encontrada.' }); // Não achou
  tasks = tasks.filter((t) => t.id !== parseInt(id)); // Remove do array
  logger.info(`Tarefa removida: id=${id}`); // Loga remoção
  res.json({ message: 'Tarefa removida com sucesso.' }); // Mensagem de sucesso
}

// Busca uma tarefa pelo id
export function getTaskById(req, res) {
  const { id } = req.params; // ID da tarefa
  const task = tasks.find((t) => t.id === parseInt(id)); // Busca tarefa
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' }); // Não achou
  }
  res.json(task); // Retorna tarefa
}

// Função utilitária para resetar tarefas (usada nos testes)
export function resetTasks() {
  tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority: 'media',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority: 'media',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority: 'media',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description 4',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority: 'media',
    },
  ];
  nextId = 5; // Reseta ID
  logger.info('Tarefas resetadas para o estado inicial.'); // Loga reset
}
