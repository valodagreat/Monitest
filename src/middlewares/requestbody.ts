import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationErrorItem } from "joi";

class RequestBodyMiddleware {
    static validate(schema: AnySchema) {
      return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error === undefined) {
          return next();
        }
        const errResponse = this.formatError(error?.details);
        return res.status(400).send({ message: errResponse, data: null });
      };
    }
  
    private static formatError(arr: ValidationErrorItem[]) {
      return arr.map((err) => err.message);
    }
  }
  
  export default RequestBodyMiddleware;