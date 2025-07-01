// Importa o Express
const express = require("express");
// Cria um roteador do Express
const router = express.Router();

// Importa as funções do controller de tarefas
const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

// Rota para buscar todas as tarefas
router.get("/", getAllTasks);
// Rota para criar uma nova tarefa
router.post("/", createTask);
// Rota para buscar uma tarefa pelo id
router.get("/:id", getTaskById);
// Rota para atualizar uma tarefa pelo id
router.patch("/:id", updateTask);
// Rota para deletar uma tarefa pelo id
router.delete("/:id", deleteTask);

// Exporta o roteador para ser usado no app principal
module.exports = router;