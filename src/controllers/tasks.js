import Joi from 'joi'; // Biblioteca para validação de dados
import logger from '../utils/logger.js'; // Logger customizado

// Array que armazena as tarefas em memória
let tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: false,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    completed: false,
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Description 4',
    completed: false,
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
});

// Esquema de validação Joi para atualização de tarefa
const updateTaskSchema = Joi.object({
  title: Joi.string(), // Título opcional
  description: Joi.string().allow(''), // Descrição opcional
  completed: Joi.boolean(), // Status opcional
});

// Retorna todas as tarefas
export function getAllTasks(req, res) {
  res.json(tasks); // Retorna array de tarefas
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
  };
  tasks.push(newTask); // Adiciona ao array
  logger.info(`Tarefa criada: ${JSON.stringify(newTask)}`); // Loga criação
  res.status(201).json(newTask); // Retorna tarefa criada
}

// Atualiza uma tarefa (title, description, completed)
export function updateTask(req, res) {
  const { id } = req.params; // ID da tarefa
  const { error, value } = updateTaskSchema.validate(req.body); // Valida dados
  if (error) return res.status(400).json({ error: error.details[0].message }); // Erro de validação
  const task = tasks.find((t) => t.id === parseInt(id)); // Busca tarefa
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' }); // Não achou
  if (value.title !== undefined) task.title = value.title; // Atualiza título
  if (value.description !== undefined) task.description = value.description; // Atualiza descrição
  if (value.completed !== undefined) task.completed = value.completed; // Atualiza status
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
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      completed: false,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      completed: false,
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description 4',
      completed: false,
    },
  ];
  nextId = 5; // Reseta ID
  logger.info('Tarefas resetadas para o estado inicial.'); // Loga reset
}
