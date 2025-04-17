// lib/logger.js
import winston from 'winston';
import 'winston-cloudwatch';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),

    new winston.transports.CloudWatch({
      logGroupName: 'MyAppLogs',
      logStreamName: `LogStream-${Date.now()}`, // unique per session
      awsRegion: process.env.S3_REGION,
      awsAccessKeyId: process.env.S3_ACCESS_KEY_ID,
      awsSecretKey: process.env.S3_SECRET_ACCESS_KEY,
      jsonMessage: true,
      retentionInDays: 365
    })
  ]
});

export default logger;