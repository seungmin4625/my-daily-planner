import { configDotenv } from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../models/user';

configDotenv();

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google-oauth',
        scope: ['profile'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findOne({
            where: { provider: 'google', providerId: profile.id },
          });
          if (user) {
            cb(null, user);
          } else {
            const newUser = await User.create({
              provider: 'google',
              providerId: profile.id,
            });
            cb(null, newUser);
          }
        } catch (err) {
          cb(err, false);
        }
      }
    )
  );
};
