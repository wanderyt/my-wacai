const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const fs = require('fs');

const multer = require('multer');
/**
 * Simple Configuration
 *
 * ```javascript
 * const upload = multer({
 *   dest: 'uploads/'
 * });
 * ```
 *
 * Complex Configuration
 *
 * ```javascript
 * const storage = multer.diskStorage({
 *   destination: function (req, file, cb) {
 *     cb(null, 'public')
 *   },
 *   filename: function (req, file, cb) {
 *     cb(null, Date.now() + '-' +file.originalname )
 *   }
 * });
 * const upload = multer({storage});
 * ```
 */
const UPLOAD_FILE_PATH = './uploads/david/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FILE_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});

// Create upload folder directory recursively.
if (!fs.existsSync(UPLOAD_FILE_PATH)) {
  fs.mkdirSync(UPLOAD_FILE_PATH, {recursive: true});
}

const upload = multer({storage}).single('file');

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

router.post('/imageUpload', async (req, res) => {
  logger.info('api /imageUpload');
  let sleepMS = Math.floor(Math.random() * 20);
  await sleep(sleepMS);
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        logger.error('api /imageUpload failed with MulterError');
      } else {
        // An unknown error occurred when uploading
        logger.error('api /imageUpload failed with unexpected error');
      }

      logger.error(err);
      res.statusCode = 500;
      res.send({
        status: false,
        err
      });
    } else {
      // Everything went fine
      logger.info('api /imageUpload success');

      res.statusCode = 200;
      res.send({
        status: true
      });
    }
  });
});

module.exports = {
  router
};
