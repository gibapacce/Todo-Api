import express from 'express';
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/tasks.js';

const router = express.Router();

// Middleware para validar se o parâmetro id é um número
function validateId(req, res, next) {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
}

// Rota para buscar todas as tarefas
router.get('/', getAllTasks);
// Rota para criar uma nova tarefa
router.post('/', createTask);
// Rota para buscar uma tarefa pelo id
router.get('/:id', validateId, getTaskById);
// Rota para atualizar uma tarefa pelo id
router.patch('/:id', validateId, updateTask);
// Rota para deletar uma tarefa pelo id
router.delete('/:id', validateId, deleteTask);

export default router;
