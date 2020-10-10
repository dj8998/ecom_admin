const express = require('express');
const { addCategory, getCategory } = require('../controller/category');
const { reqiredSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const multer  = require('multer')
const path =require('path')
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads' ))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' +file.originalname)
    }
  })

  const upload = multer({ storage })
   

router.post('/category/create',reqiredSignin, adminMiddleware, upload.single('categoryImage') , addCategory);
router.get('/category/getcategory', getCategory)

module.exports = router