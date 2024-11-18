import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';

import sequelize from './utils/database';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);

sequelize
  .authenticate()
  .then((response) => console.log('db connection success'))
  .catch((error) => console.log('db connection failed'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
