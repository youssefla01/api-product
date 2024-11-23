import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const zodValidator = (schema: z.ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data',
        errors: result.error.errors,
      });
    }

    req.body = result.data;
    next();
  };
};
