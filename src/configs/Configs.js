import {
  API_BASE_URL
} from '../networkings/api';
import { APP_NAME } from '../constants';

const isDevelopmentMode = __DEV__;

// Log
const enableLog = isDevelopmentMode;
const reactotron = {
  enable: true,
};

export const appConfigs = {
  appName: APP_NAME,
  enableLog,
  reactotron,
  // API
  apiBaseURL: API_BASE_URL,
};
