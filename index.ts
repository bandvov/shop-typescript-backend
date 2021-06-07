import dotenv from 'dotenv';
import log4js from 'log4js';
import { app } from './app';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL as string;

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');
const port: string | number = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('app is running on port', port);
});
