import logger from '../utils/logger.js';
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  logger.error(err.stack || err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Erro interno do servidor' });
};
