import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
export default (req, res, next) => {
  // Obtém o token do header Authorization (formato: Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    // Usa variável de ambiente para o segredo do JWT
    const jwtSecret = process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETO';
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    logger.error('Erro de autenticação JWT:', err);
    res.status(401).json({ error: 'Token inválido' });
  }
};
