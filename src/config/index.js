require('dotenv').config()

const config = {
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',

  /**
   *port for running express
   */
  port: process.env.PORT || 5000,

  /**
   * Application Environment
   */
  env: process.env.NODE_ENV || 'dev',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    directory: process.env.LOGDIR || 'storage/logs',
  },

  viewEngine: process.env.VIEW_ENGINE || 'json',

  /**
   * That long string from mlab
   */
  dbUrl: process.env.DBURL || 'mongodb://mongodb:27017/live-blog-backend',

  /**
   * Your secret sauce
   */
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || 's0m3$3Diwakar$h0lyC0d3&$',
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || 's0m3$3SUbhash$h0lyC0d3&$',
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || '7d',
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '30d',
  jwtAlgorithm: process.env.JWT_ALGO || '',
  jwtSession: {
    session: false,
  },

  /**
   * Storage configs
   */
  storageEngine: process.env.STORAGE_ENGINE || 's3',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || 'kdjsheiwu7437483',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'kdjsheiwu7437483',
  awsAccessRegion: process.env.AWS_REGION || 'kdjsheiwu7437483',
  awsAccessS3BucketName: process.env.AWS_S3_BUCKET_NAME || 'kdjsheiwu7437483',
  maxFileSize: 10485760,
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  /**
   * Common place for roles configs
   */
  roles: {
    bothRole: `auth.checkRole:["Editor","Reader"]`,
    editorRole: `auth.checkRole:["Editor"]`,
    raderRole: `auth.checkRole:["Reader"]`,
  },
}

module.exports = config
