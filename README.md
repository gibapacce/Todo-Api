# Todo API Node.js

API RESTful para gerenciamento de tarefas (ToDo), desenvolvida com Node.js e Express. Inclui autenticação JWT, filtros, busca, paginação, testes automatizados e documentação.

## 🚀 Funcionalidades

- Cadastro e login de usuários (mock)
- Autenticação JWT para rotas protegidas
- CRUD completo de tarefas
- Filtros por status, busca por palavra-chave e paginação
- Campos avançados: prioridade, data de criação e conclusão
- Validação de dados com Joi
- Logger customizado (Winston)
- Testes automatizados (Jest + Supertest)
- Documentação da API

## 🛠️ Tecnologias

- Node.js, Express
- JWT (jsonwebtoken)
- Joi (validação)
- Winston (logger)
- Jest & Supertest (testes)
- Prettier & ESLint (padronização)

## ⚙️ Instalação

```bash
npm install
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
JWT_SECRET=SEGREDO_SUPER_SECRETO
```

## ▶️ Executando o servidor

```bash
npm start
```
O servidor irá rodar na porta 3000 por padrão.

## 🔑 Autenticação

- Faça login em `/login` enviando `username` e `password` (veja usuários mockados no código ou use `/register`).
- O endpoint retorna um token JWT.
- Envie o token no header `Authorization` como `Bearer <token>` para acessar as rotas de `/tasks`.

## 📚 Principais Rotas

- `POST /register` — cadastra novo usuário (username único)
- `POST /login` — retorna um token JWT
- `POST /logout` — logout simulado (descartar token)
- `GET /tasks` — lista tarefas (filtros: `completed`, `search`, `page`, `limit`)
- `POST /tasks` — cria nova tarefa
- `GET /tasks/:id` — busca tarefa por id
- `PATCH /tasks/:id` — atualiza tarefa (parcial ou total)
- `DELETE /tasks/:id` — remove tarefa

## 🧪 Testes

```bash
npm test
```
Os testes cobrem casos de sucesso e erro para as rotas de tarefas, autenticação e validação.

## 📄 Documentação

Veja o arquivo [`docs.md`](./docs.md) para detalhes completos das rotas, exemplos de payload e respostas.

## 💻 Projeto no GitHub

[https://github.com/gibapacce/todo-api-nodejs](https://github.com/gibapacce/todo-api-nodejs)

## 👤 Autor

Gilberto Pacce  
[LinkedIn](https://www.linkedin.com/in/gilberto-pacce) | [GitHub](https://github.com/gibapacce)

---

Sinta-se à vontade para contribuir ou sugerir melhorias!
