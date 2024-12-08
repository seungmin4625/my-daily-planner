import express from 'express';
import { getIndex } from '../controllers/home';
import { isAuth } from '../middlewares/validators/auth';

const router = express.Router();

router.get('/', isAuth, getIndex);

export default router;
