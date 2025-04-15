import type { NextFunction, Request, Response } from "express";
import { handleErrorsBackend } from "../controllers/errors";

interface ErrorResponse extends Error {
  statusCode?: number;
}


const errorHandler = async (err: ErrorResponse, req: Request, res: Response, _next: NextFunction): Promise<void> => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[ERROR] ${statusCode} ${req.method} ${req.path} - ${message}`);

  // Intentamos guardar el error en la base de datos
  try {
    await handleErrorsBackend({
      path: req.path,
      Message: message,
      Id_Usuario: 0,
      Metodo: req.method,
      code: statusCode.toString(),
      svr: ""
    });

  } catch (loggingError) {
    console.error('Error guardando log en la DB:', loggingError);
  }

  res.status(statusCode).json({ error: message });
};

export { errorHandler };
