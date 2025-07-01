# Todo API

API simples de tarefas (ToDo) feita com Node.js e Express.

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
JWT_SECRET=SEGREDO_SUPER_SECRETO
```

## Executando o servidor

```bash
npm start
```

O servidor irá rodar na porta 3000 por padrão.

## Autenticação

- Faça login em `/login` enviando `username` e `password` (veja usuários mockados no código).
- O endpoint retorna um token JWT.
- Envie o token no header `Authorization` como `Bearer <token>` para acessar as rotas de `/tasks`.

## Rotas principais

- `POST /login` — retorna um token JWT
- `GET /tasks` — lista todas as tarefas (requer JWT)
- `POST /tasks` — cria uma nova tarefa (requer JWT)
- `GET /tasks/:id` — busca tarefa por id (requer JWT)
- `PATCH /tasks/:id` — atualiza tarefa (requer JWT)
- `DELETE /tasks/:id` — remove tarefa (requer JWT)

## Testes

```bash
npm test
```

Os testes cobrem casos de sucesso e erro para as rotas de tarefas. 