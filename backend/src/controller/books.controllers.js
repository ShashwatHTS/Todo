
const books = require("../db/books.db")
exports.getAll = function (req, res, next) {
    // console.log(books[0])
    res.send(books)
}
exports.getBookById = function (req, res, next) {
    // find a book by id
    let result = books.find(book => book.id == req.params.id)
    if (!result) return res.status(404).send("Book not found")
    res.send(result)
}

function generateRandomID() {
    const randomNum = Math.random();
    const randomString = randomNum.toString().substr(2, 4)
    const result = parseInt(randomString, 10)
    return result
}

exports.createBook = function (req, res, next) {
    // create a book
    let newBook = req.body
    newBook.id = generateRandomID()
    // newBook.name = req.body.name
    books.push(newBook)
    console.log(books)
    res.send(newBook)
}

exports.updateBook = function (req, res, next) {
    // update a book
    let result = books.find(book => book.id == req.params.id)
    if (!result) return res.status(404).send("Book not found")
    result.name = req.body.name
    res.send(result)
}

exports.deleteBook = function (req, res, next) {
    // delete a book
    let result = books.find(book => book.id == req.params.id)
    if (!result) return res.status(404).send("Book not found")
    let index = books.indexOf(result)
    books.splice(index, 1)
    res.send("successfully got deleted")
}