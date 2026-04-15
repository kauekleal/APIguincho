import { NextFunction, Request, Response } from "express";

export function asyncHandler<R extends Request = Request>(
  fn: (req: R, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void fn(req as R, res, next).catch(next);
  };
}
