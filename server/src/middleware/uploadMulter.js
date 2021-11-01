const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../../public/data/uploads')
  },
  filename(req, res, cb) {
    cb(null, new Date().toISOString() + '-' + file.orginalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || 'image/jpeg' || 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({storage, fileFilter})
