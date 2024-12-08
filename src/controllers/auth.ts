import { Request, Response, NextFunction } from 'express';

const getSignIn = (req: Request, res: Response, next: NextFunction) => {
  res.render('auth/signin');
};

const getGoogleOauth = (req: Request, res: Response, next: NextFunction) => {
  console.log('authenticated by google');
  res.redirect('/');
};

export { getSignIn, getGoogleOauth };
