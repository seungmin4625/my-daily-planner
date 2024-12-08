import passport, { AuthenticateOptions } from 'passport';

import passportGoogle from './passport-google';
import { User } from '../../models/user';

export default () => {
  passport.serializeUser((user, cb) => {
    console.log(`serializeUser: ${JSON.stringify(user)}`);
    cb(null, user);
  });

  passport.deserializeUser((user: User, cb) => {
    console.log(`deserializeUser: ${JSON.stringify(user)}`);
    cb(null, user);
  });

  passportGoogle();
};

export const authenticate = (provider: string, options: AuthenticateOptions) => {
  return passport.authenticate(provider, options);
};
