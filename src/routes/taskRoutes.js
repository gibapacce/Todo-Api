import express from 'express'; // Importa o Express
import {
  getAllTasks, // Função para listar tarefas
  createTask, // Função para criar tarefa
  getTaskById, // Função para buscar tarefa por ID
  updateTask, // Função para atualizar tarefa
  deleteTask, // Função para deletar tarefa
} from '../controllers/tasks.js'; // Importa funções do controller

const router = express.Router(); // Cria um roteador Express

// Middleware para validar se o parâmetro id é um número
function validateId(req, res, next) {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: 'ID inválido' }); // Retorna erro se não for número
  }
  next(); // Continua se válido
}

// Rota para buscar todas as tarefas
router.get('/', getAllTasks); // GET /tasks
// Rota para criar uma nova tarefa
router.post('/', createTask); // POST /tasks
// Rota para buscar uma tarefa pelo id
router.get('/:id', validateId, getTaskById); // GET /tasks/:id
// Rota para atualizar uma tarefa pelo id
router.patch('/:id', validateId, updateTask); // PATCH /tasks/:id
// Rota para deletar uma tarefa pelo id
router.delete('/:id', validateId, deleteTask); // DELETE /tasks/:id

export default router; // Exporta o roteador
