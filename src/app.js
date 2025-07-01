// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();
// Importa o framework Express
const express = require("express");
// Importa o body-parser para lidar com JSON no corpo das requisições
const bodyParser = require("body-parser");
// Importa o CORS para permitir requisições de outros domínios
const cors = require("cors");
// Importa as rotas de tarefas
const taskRoutes = require("./routes/taskRoutes");
// Importa JWT e bcrypt para autenticação
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('./middleware/auth');

// Cria uma instância do aplicativo Express
const app = express();
// Habilita o uso do CORS na aplicação
app.use(cors());
// Permite que a aplicação entenda JSON no corpo das requisições
app.use(bodyParser.json());

// Mock de usuários (em memória)
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('senha123', 8) },
  { id: 2, username: 'user', password: bcrypt.hashSync('senha123', 8) },
];

// Rota de login (deve vir antes das rotas de tasks)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validação básica dos campos
  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }
  const user = users.find(u => u.username === username);
  // Verifica se usuário existe e se a senha está correta
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
  // Usa variável de ambiente para o segredo do JWT, ou valor padrão para desenvolvimento
  const jwtSecret = process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETO';
  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Usa as rotas de tarefas para requisições que começam com /tasks
app.use('/tasks', authMiddleware, taskRoutes);

// Inicia o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
    // Define a porta (usa a porta do ambiente ou 3000 por padrão)
    const PORT = process.env.PORT || 3000;
    // Inicia o servidor e exibe uma mensagem no console
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Exporta o app para ser usado em outros arquivos (como nos testes)
module.exports = app;

