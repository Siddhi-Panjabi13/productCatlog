import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './errorHandler';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ErrorHandler) {
   
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  } 
  else if(err.code===401){
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  else if(err.errorResponse.code===11000){
    res.status(1100).json({
      status: false,
      statusCode: 11000,
      message: 'Duplicate field entered',
    });
  }
  else {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
};