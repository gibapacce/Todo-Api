// Array que armazena as tarefas em memória
let tasks = [
    {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: false,
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        completed: false,
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        completed: false,
    },
    {
        id: 4,
        title: "Task 4",
        description: "Description 4",
        completed: false,
    },
];

// Variável para controlar o próximo id único
let nextId = 5;

// Retorna todas as tarefas
const getAllTasks = (req, res) => {
    res.json(tasks);
};

// Cria uma nova tarefa
const createTask = (req, res) => {
    const { title, description = "" } = req.body; // Permite enviar description
    if (!title) {
        return res.status(400).json({ error: "O campo 'title' é obrigatório." });
    }
    const newTask = {
        id: nextId++,
        title,
        description,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Atualiza uma tarefa (title, description, completed)
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
};

// Remove uma tarefa pelo id
const deleteTask = (req, res) => {
    const { id } = req.params;
    const exists = tasks.some(t => t.id === parseInt(id));
    if (!exists) return res.status(404).json({ error: "Tarefa não encontrada." });
    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.json({ message: "Tarefa removida com sucesso." });
};

// Busca uma tarefa pelo id
const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    res.json(task);
};

// Função utilitária para resetar tarefas (usada nos testes)
const resetTasks = () => {
    tasks = [
        {
            id: 1,
            title: "Task 1",
            description: "Description 1",
            completed: false,
        },
        {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            completed: false,
        },
        {
            id: 3,
            title: "Task 3",
            description: "Description 3",
            completed: false,
        },
        {
            id: 4,
            title: "Task 4",
            description: "Description 4",
            completed: false,
        },
    ];
    nextId = 5;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getTaskById, resetTasks };