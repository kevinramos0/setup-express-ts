import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
