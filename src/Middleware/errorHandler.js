// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // Loga o erro no console (pode ser trocado por um logger profissional)
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Erro interno do servidor' });
};
