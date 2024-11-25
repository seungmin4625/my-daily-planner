import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import logger from '../utils/logger';

const getLogin = (req: Request, res: Response, next: NextFunction) => {
  res.render('auth/login');
};

const postLogin = (req: Request, res: Response, next: NextFunction) => {};

const getSignUp = (req: Request, res: Response, next: NextFunction) => {
  res.render('auth/signup', {
    errorMessage: '',
  });
};

const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      errorMessage: errors.array()[0].msg,
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hash,
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    logger.error(`postSignUp exception: ${error}`);
  }
};

export { getLogin, postLogin, getSignUp, postSignUp };
