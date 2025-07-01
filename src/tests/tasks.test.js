// Importa o supertest para testar as rotas HTTP
const request = require('supertest');
// Importa o app Express
const app = require('../app');

// Descreve o grupo de testes da API de tarefas
describe('Tasks API', () => {
  // Testa se o GET /tasks retorna todas as tarefas
  it('GET /tasks → deve retornar todas as tarefas', async () => {
    const res = await request(app).get('/tasks'); // Faz uma requisição GET
    expect(res.statusCode).toBe(200); // Espera status 200
    expect(res.body).toBeInstanceOf(Array); // Espera um array como resposta
  });

  // Testa se o POST /tasks cria uma nova tarefa
  it('POST /tasks → deve criar uma nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks') // Faz uma requisição POST
      .send({ title: "Novo item" }); // Envia o título da nova tarefa
    expect(res.statusCode).toBe(201); // Espera status 201
    expect(res.body).toHaveProperty('id'); // Espera que a resposta tenha um id
  });
});