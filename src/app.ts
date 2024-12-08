import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';
import passport from 'passport';

import authRoutes from './routes/auth';
import logger from './utils/logger';
import sequelize from './utils/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const SequelizeStore = sessionSequelize(session.Store);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(
  session({
    secret: 'my-daily-planner-2024',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
      tableName: 'sessions',
    }),
  })
);
app.use(passport.authenticate('session'));

//#region routes
app.use('/auth', authRoutes);
//#endregion

//#region redirect
// 아직 랜딩 페이지가 없음...
app.get('/', (req, res, next) => {
  console.log(`landing: ${JSON.stringify(req.user)}`);
  res.redirect('/auth/signin');
});
//#endregion

//#region run server
sequelize.sync().then((result) => {
  app.listen(port, () => {
    const message = `[server:${process.pid}]: Server is running at http://localhost:${port}`;
    console.log(message);
    logger.info(message);
  });
});
//#endregion
