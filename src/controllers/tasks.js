const Joi = require('joi');

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
let nextId = 5;

// Esquema de validação Joi para criação de tarefa
const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'O campo title é obrigatório.',
    'any.required': 'O campo title é obrigatório.',
  }),
  description: Joi.string().allow('').default(''),
});

// Esquema de validação Joi para atualização de tarefa
const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  completed: Joi.boolean(),
});

// Retorna todas as tarefas
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// Cria uma nova tarefa
const createTask = (req, res) => {
  const { error, value } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const newTask = {
    id: nextId++,
    title: value.title,
    description: value.description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Atualiza uma tarefa (title, description, completed)
const updateTask = (req, res) => {
  const { id } = req.params;
  const { error, value } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  if (value.title !== undefined) task.title = value.title;
  if (value.description !== undefined) task.description = value.description;
  if (value.completed !== undefined) task.completed = value.completed;
  res.json(task);
};

// Remove uma tarefa pelo id
const deleteTask = (req, res) => {
  const { id } = req.params;
  const exists = tasks.some((t) => t.id === parseInt(id));
  if (!exists) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ message: 'Tarefa removida com sucesso.' });
};

// Busca uma tarefa pelo id
const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
  res.json(task);
};

// Função utilitária para resetar tarefas (usada nos testes)
const resetTasks = () => {
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
  nextId = 5;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  resetTasks,
};
