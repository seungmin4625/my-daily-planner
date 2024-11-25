import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import bcrypt from 'bcrypt';

import { User } from './models/user';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(authRoutes);

User.sync();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  const data = 'qktod!23';
  bcrypt.hash(data, 12);

  User.create({email: 'basang123@naver.com', password: 'qktod!23'});
});
