const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const config = require('../../config')
// S3 Configuration
const s3 = new aws.S3({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsAccessRegion,
})

// Storage handler to abstract different storage engines
const storageHandler = {
  s3: multerS3({
    s3,
    bucket: config.awsAccessS3BucketName,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName = `${Date.now()}_${path.basename(file.originalname)}`
      cb(null, fileName)
    },
  }),

  local: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'storage/uploads/'
      fs.mkdirSync(uploadPath, { recursive: true })
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_${path.basename(file.originalname)}`
      cb(null, fileName)
    },
  }),
}

const getStorage = (engine) => {
  return storageHandler[engine] || storageHandler.local
}

module.exports = { getStorage }
