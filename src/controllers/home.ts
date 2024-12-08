import { NextFunction, Request, Response } from 'express';

const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.render('/');  
};

export { getIndex };
