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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtra tarefas por status de conclusão
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca por palavra-chave no título ou descrição
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/', getAllTasks); // GET /tasks

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *               priority:
 *                 type: string
 *                 enum: [baixa, media, alta]
 *                 description: Prioridade da tarefa
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createTask); // POST /tasks

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', validateId, getTaskById); // GET /tasks/:id

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               priority:
 *                 type: string
 *                 enum: [baixa, media, alta]
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch('/:id', validateId, updateTask); // PATCH /tasks/:id

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', validateId, deleteTask); // DELETE /tasks/:id

export default router; // Exporta o roteador
