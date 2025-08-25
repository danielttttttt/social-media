import type { Request, Response, NextFunction } from 'express';
import type { ZodObject } from 'zod';
import { ZodError } from 'zod';

export const validate = (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // The parse method will throw an error if validation fails.
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      // If validation is successful, call the next middleware.
      next();
    } catch (error) {
      // Check if the error is a Zod validation error
      if (error instanceof ZodError) {
        // If it is, send a 400 Bad Request response with the error details.
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues,
        });
      }
      
      next(error);
    }
  };