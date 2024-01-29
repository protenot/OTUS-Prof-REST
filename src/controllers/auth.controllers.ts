import { Request, Response, NextFunction } from 'express';
export function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function checkNotAuthenticated(req: Request, res: Response, next:NextFunction) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}
