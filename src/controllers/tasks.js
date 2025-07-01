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

// Retorna todas as tarefas
const getAllTasks = (req, res) => {
    res.json(tasks);
};

// Cria uma nova tarefa
const createTask = (req, res) => {
    const { title } = req.body; // Pega o título do corpo da requisição
    if (!title) {
        // Se não tiver título, retorna erro 400
        return res.status(400).json({ error: "Title is required" });
    }
    // Cria o objeto da nova tarefa
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
    };
    tasks.push(newTask); // Adiciona a nova tarefa ao array
    res.status(201).json(newTask); // Retorna a nova tarefa criada
};

// Atualiza o status de uma tarefa (concluída ou não)
const updateTask = (req, res) => {
  const { id } = req.params; // Pega o id da URL
  const { completed } = req.body; // Pega o status do corpo da requisição
  const task = tasks.find(t => t.id === parseInt(id)); // Busca a tarefa pelo id
  if (!task) return res.status(404).json({ error: "Task not found" }); // Se não encontrar, retorna erro 404
  task.completed = completed; // Atualiza o status
  res.json(task); // Retorna a tarefa atualizada
};

// Remove uma tarefa pelo id
const deleteTask = (req, res) => {
  const { id } = req.params; // Pega o id da URL
  tasks = tasks.filter(t => t.id !== parseInt(id)); // Remove a tarefa do array
  res.sendStatus(204); // Retorna status 204 (sem conteúdo)
};

// Busca uma tarefa pelo id
const getTaskById = (req, res) => {
    const { id } = req.params; // Pega o id da URL
    const task = tasks.find(t => t.id === parseInt(id)); // Busca a tarefa pelo id
    if (!task) {
        // Se não encontrar, retorna erro 404
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task); // Retorna a tarefa encontrada
};

// Exporta todas as funções para serem usadas nas rotas
module.exports = { getAllTasks, createTask, updateTask, deleteTask, getTaskById };