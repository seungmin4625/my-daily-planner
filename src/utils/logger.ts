import winston from 'winston';

const now = new Date();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}.log` }),
  ],
});

export default logger;
