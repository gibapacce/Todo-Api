# Documentação da API Todo-API

## Autenticação

- **JWT obrigatório para rotas de tarefas.**
- Faça login em `/login` para obter um token e envie no header: `Authorization: Bearer <token>`

---

## Rotas de Usuário

### POST /register

Cadastra um novo usuário (username único).

**Body:**

```
{
  "username": "string",
  "password": "string"
}
```

**Respostas:**

- 201: Usuário registrado
- 409: Nome de usuário já existe

### POST /login

Autentica usuário e retorna um token JWT.

**Body:**

```
{
  "username": "string",
  "password": "string"
}
```

**Respostas:**

- 200: `{ token: "..." }`
- 401: Credenciais inválidas

### POST /logout

Logout simulado (apenas descartar o token no frontend).

---

## Rotas de Tarefas (protegidas)

### GET /tasks

Lista tarefas com filtros, busca e paginação.

**Query params:**

- `completed=true|false` — filtra por status
- `search=palavra` — busca por título/descrição
- `page=1` — página
- `limit=10` — itens por página

**Resposta:**

```
{
  "total": 4,
  "page": 1,
  "limit": 10,
  "data": [ { ...tarefa } ]
}
```

### POST /tasks

Cria uma nova tarefa.

**Body:**

```
{
  "title": "string",
  "description": "string (opcional)",
  "priority": "baixa|media|alta" (opcional)
}
```

**Resposta:** 201 + tarefa criada

### GET /tasks/:id

Busca tarefa pelo id.

### PATCH /tasks/:id

Atualiza parcialmente uma tarefa (qualquer campo).

**Body exemplo:**

```
{
  "title": "Novo título"
}
```

### DELETE /tasks/:id

Remove tarefa pelo id.

---

## Modelo de Tarefa

```
{
  "id": 1,
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "2024-06-01T12:00:00.000Z",
  "completedAt": null,
  "priority": "baixa|media|alta"
}
```

---

## Observações

- O logout é apenas simulado (descartar token JWT no frontend).
- O cadastro de usuário é apenas em memória (mock).
- Atualização parcial de tarefas é suportada via PATCH.
- Filtros, busca e paginação disponíveis em GET /tasks.
