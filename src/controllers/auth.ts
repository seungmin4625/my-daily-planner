import { Request, Response, NextFunction } from 'express';

const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.render('auth/index');
};

const postLogin = (req: Request, res: Response, next: NextFunction) => {

};

export { getIndex, postLogin };
