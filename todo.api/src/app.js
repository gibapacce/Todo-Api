/**
 * Arquivo principal da aplicação.
 * Inicializa o servidor Express, configura middlewares, rotas e tratamento de erros.
 */
// Carrega variáveis de ambiente do arquivo .env
import 'dotenv/config'; // Importa variáveis de ambiente
// Importa o framework Express
import express from 'express'; // Framework para criar o servidor
// Importa o body-parser para lidar com JSON no corpo das requisições
import bodyParser from 'body-parser'; // Middleware para tratar JSON
// Importa o CORS para permitir requisições de outros domínios
import cors from 'cors'; // Middleware para habilitar CORS
// Importa as rotas de tarefas
import taskRoutes from './routes/taskRoutes.js'; // Rotas de tarefas
// Importa JWT e bcrypt para autenticação
import jwt from 'jsonwebtoken'; // Biblioteca para tokens JWT
import bcrypt from 'bcryptjs'; // Biblioteca para hash de senhas
import authMiddleware from './middleware/auth.js'; // Middleware de autenticação
import errorHandler from './middleware/errorHandler.js'; // Middleware de tratamento de erros
import logger from './utils/logger.js'; // Logger customizado
import { swaggerUi, swaggerSpec } from './swagger.js';

// Cria uma instância do aplicativo Express
const app = express(); // Inicializa o app
// Habilita o uso do CORS na aplicação
app.use(cors()); // Aplica o middleware CORS
// Permite que a aplicação entenda JSON no corpo das requisições
app.use(bodyParser.json()); // Aplica o middleware body-parser

/**
 * Mock de usuários em memória para autenticação e testes.
 * Cada usuário possui: id, username, password (hash).
 * @type {Array<Object>}
 */
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('senha123', 8) }, // Usuário admin
  { id: 2, username: 'user', password: bcrypt.hashSync('senha123', 8) }, // Usuário comum
];

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token JWT
 *       400:
 *         description: Usuário e senha são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Extrai usuário e senha do corpo
  // Validação básica dos campos
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' }); // Campos obrigatórios
  }
  const user = users.find((u) => u.username === username); // Busca usuário
  // Verifica se usuário existe e se a senha está correta
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' }); // Credenciais erradas
  }
  // Usa variável de ambiente para o segredo do JWT, ou valor padrão para desenvolvimento
  const jwtSecret = process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETO'; // Segredo do JWT
  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' }); // Gera token
  res.json({ token }); // Retorna token
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Usuário e senha são obrigatórios
 *       409:
 *         description: Nome de usuário já existe
 */
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  // Verifica se já existe usuário com o mesmo username
  const exists = users.some((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ error: 'Nome de usuário já existe' });
  }
  const newUser = {
    id: users.length + 1,
    username,
    password: bcrypt.hashSync(password, 8),
  };
  users.push(newUser);
  res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout do usuário (simulado)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout simulado realizado com sucesso
 */
app.post('/logout', (req, res) => {
  // No backend stateless, basta o frontend descartar o token.
  res.json({
    message: 'Logout simulado: basta descartar o token no frontend.',
  });
});

/**
 * Middleware de autenticação aplicado às rotas de tarefas.
 * Protege as rotas de /tasks.
 */
app.use('/tasks', authMiddleware, taskRoutes); // Rotas protegidas por autenticação

/**
 * Inicialização do servidor Express.
 * Só executa se este arquivo for chamado diretamente.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`[App] Servidor iniciado na porta ${PORT}`));

// Exporta o app para ser usado em outros arquivos (como nos testes)
export default app; // Exportação para testes

/**
 * Middleware global de tratamento de erros.
 * Deve ser o último middleware registrado.
 */
app.use(errorHandler); // Aplica middleware de erro

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
