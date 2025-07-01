// Importa o framework Express
const express = require("express");
// Importa o body-parser para lidar com JSON no corpo das requisições
const bodyParser = require("body-parser");
// Importa o CORS para permitir requisições de outros domínios
const cors = require("cors");
// Importa as rotas de tarefas
const taskRoutes = require("./routes/taskRoutes");

// Cria uma instância do aplicativo Express
const app = express();
// Habilita o uso do CORS na aplicação
app.use(cors());
// Permite que a aplicação entenda JSON no corpo das requisições
app.use(bodyParser.json());

// Usa as rotas de tarefas para requisições que começam com /tasks
app.use("/tasks", taskRoutes);

// Inicia o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
    // Define a porta (usa a porta do ambiente ou 3000 por padrão)
    const PORT = process.env.PORT || 3000;
    // Inicia o servidor e exibe uma mensagem no console
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Exporta o app para ser usado em outros arquivos (como nos testes)
module.exports = app;

