const express = require('express');
const router = express.Router();
const cors = require('cors')

const { getData, getBookById, createBook, deleteBook, updateBook } = require('../controller/books.controllers')

router.get('/', getData);
router.get('/search/:id', getBookById);
router.post('/create', createBook);
router.delete('/delete/:id', deleteBook);
router.put('/update/:id', updateBook)

module.exports = router;

