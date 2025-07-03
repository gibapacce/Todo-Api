import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';

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
    logger.error(
      `[AuthMiddleware] Falha na autenticação JWT | motivo="${err.message}"`,
      { stack: err.stack }
    );
    res.status(401).json({ error: 'Token inválido' });
  }
};
