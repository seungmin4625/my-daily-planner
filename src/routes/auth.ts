import express from 'express';
import { getIndex, postLogin } from '../controllers/auth';

const router = express.Router();

router.get('/', getIndex);
router.post('/login', postLogin);

export default router;
