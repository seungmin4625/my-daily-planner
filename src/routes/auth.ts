import express from 'express';
import {
  getLogin,
  postLogin,
  getSignUp,
  postSignUp,
} from '../controllers/auth';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from '../middlewares/validators/auth';

const router = express.Router();

router.get('/', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignUp);
router.post(
  '/signup',
  [emailValidator(), passwordValidator(), confirmPasswordValidator()],
  postSignUp
);

export default router;
