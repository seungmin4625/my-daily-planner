import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'qktod!23', {
  host: 'localhost',
  dialect: 'postgres',
  timezone: '+09:00',
  dialectOptions: {
    timezone: '+09:00',
  },
});

export default sequelize;
