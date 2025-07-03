import logger from '../utils/logger.js'; // Importa o logger
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  logger.error(
    `[ErrorHandler] Erro não tratado | mensagem="${err.message}"`,
    { stack: err.stack }
  );
  res
    .status(err.status || 500) // Status do erro ou 500
    .json({ error: err.message || 'Erro interno do servidor' }); // Mensagem de erro
};
