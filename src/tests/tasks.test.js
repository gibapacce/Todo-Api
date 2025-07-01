// Importa o supertest para testar as rotas HTTP
const request = require('supertest');
// Importa o app Express
const app = require('../app');
// Importa função para resetar tarefas
const { resetTasks } = require('../controllers/tasks');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/login')
    .send({ username: 'admin', password: 'senha123' });
  token = res.body.token;
});

// Descreve o grupo de testes da API de tarefas
describe('Tasks API', () => {
  // Reseta as tarefas antes de cada teste
  beforeEach(() => {
    resetTasks();
  });

  // Testa se o GET /tasks retorna todas as tarefas
  it('GET /tasks → deve retornar todas as tarefas', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200); // Espera status 200
    expect(res.body).toBeInstanceOf(Array); // Espera um array como resposta
  });

  // Testa se o POST /tasks cria uma nova tarefa
  it('POST /tasks → deve criar uma nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Novo item', description: 'Nova descrição' });
    expect(res.statusCode).toBe(201); // Espera status 201
    expect(res.body).toHaveProperty('id'); // Espera que a resposta tenha um id
    expect(res.body).toHaveProperty('description', 'Nova descrição'); // Espera que a resposta tenha a descrição correta
  });

  it('POST /tasks → deve retornar erro se título não for enviado', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /tasks/:id → deve retornar uma tarefa existente', async () => {
    const res = await request(app)
      .get('/tasks/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('GET /tasks/:id → deve retornar erro para id inexistente', async () => {
    const res = await request(app)
      .get('/tasks/999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('PATCH /tasks/:id → deve atualizar title, description e completed', async () => {
    const res = await request(app)
      .patch('/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Atualizado',
        description: 'Desc atualizada',
        completed: true,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Atualizado');
    expect(res.body).toHaveProperty('description', 'Desc atualizada');
    expect(res.body).toHaveProperty('completed', true);
  });

  it('PATCH /tasks/:id → deve retornar erro para id inexistente', async () => {
    const res = await request(app)
      .patch('/tasks/999')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Qualquer' });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('DELETE /tasks/:id → deve remover uma tarefa existente', async () => {
    const res = await request(app)
      .delete('/tasks/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('DELETE /tasks/:id → deve retornar erro para id inexistente', async () => {
    const res = await request(app)
      .delete('/tasks/999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /tasks/:id → deve retornar erro para id inválido', async () => {
    const res = await request(app)
      .get('/tasks/abc')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
