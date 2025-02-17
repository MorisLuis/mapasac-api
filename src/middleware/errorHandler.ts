// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import handleErrorsBackend from '../controllers/errors';
import { handleGetSession } from '../utils/Redis/getSession';

// Error de base de datos o conexión
class DatabaseError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 500;
    this.name = 'DatabaseError';
  }
}

// Error personalizado
class CustomError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
  }
}

// Middleware de manejo de errores
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.sessionID;
  const { user: userFR } = await handleGetSession({ sessionId });

  const error = {
    Message: err.message,
    Metodo: req.method,
    path: req.originalUrl,
    Id_Usuario: userFR?.idusrmob,
    svr: userFR?.svr
  };

  await handleErrorsBackend(error);

  // Manejo de errores específicos
  if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      message: 'Error de base de datos: ' + err.message,
    });
  }

  // Otros errores personalizados
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }


  // Errores no controlados
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });

};

export { errorHandler, DatabaseError, CustomError };
