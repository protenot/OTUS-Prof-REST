export function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function checkNotAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}
