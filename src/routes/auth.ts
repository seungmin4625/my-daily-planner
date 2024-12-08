import express from 'express';

import passport, { authenticate } from '../middlewares/oauth/passport';
import { getGoogleOauth, getSignIn } from '../controllers/auth';

passport();
const router = express.Router();

router.get('/signin', getSignIn);
router.get('/google', authenticate('google', { scope: ['profile'] }));
router.get(
  '/google-oauth',
  authenticate('google', { failureRedirect: '/' }),
  getGoogleOauth,
);

export default router;
