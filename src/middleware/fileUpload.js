const multer = require('multer')
const { getStorage } = require('../util/handlers/storageHandler')
const logger = require('../util/logger/logger')

const uploadMiddleware = (storageEngine, maxSize) => {
  const storage = getStorage(storageEngine)

  const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      // Optionally, we can add file type validation here
      cb(null, true)
    },
  }).array('files') // Use .single('file') for single file upload

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ status: false, message: err.message, error: `${err}` })
      } else if (err) {
        return res.status(500).send({
          status: false,
          message: 'File upload failed',
          error: `${err}`,
        })
      }
      next()
    })
  }
}

module.exports = {
  uploadMiddleware: uploadMiddleware,
}
