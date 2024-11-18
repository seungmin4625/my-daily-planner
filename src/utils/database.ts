import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'qktod!23', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
