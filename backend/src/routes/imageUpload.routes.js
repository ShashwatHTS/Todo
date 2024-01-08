const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { uploadAllImages, uploadFile, uploadFileToSupabase, readFileAsArrayBuffer } = require('../controller/fileUploader.controllers')

// const {uploadFile} = require('../../../index.js')

router.post('/', upload.single('file'), readFileAsArrayBuffer);


module.exports = router;


