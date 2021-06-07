import { Response, Request } from 'express';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL as string;

export const catchErrors = (fn: Function) => (req: Request, res: Response, next: Function) => fn(req, res, next).catch((error: string) => {
  if (typeof error === 'string') {
    logger.error(error);
    res.status(400).json({ message: error });
  }
  next(error);
});

export const notFound = (req: Request, res: Response, next: Function) => {
  res.status(404).json({ message: 'Route not found' });
};

export const mongooseError = (
  err: { errors: string[] },
  req: Request,
  res: Response,
  next: Function,
) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  let message = '';
  errorKeys.forEach((key) => {
    message += `${err.errors[key].message}`;
  });
  message = message.substr(0, message.length - 2);
  logger.error(message);
  res.status(400).json({ message });
};
