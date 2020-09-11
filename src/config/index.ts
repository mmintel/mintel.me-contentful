export default {
  isProduction: process.env.NODE_ENV === 'production',
  env: process.env.NODE_ENV || 'development',
  logLevel: Number(process.env.LOG_LEVEL || 3),
};
