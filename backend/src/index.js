require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.set('view engine', 'ejs')


app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 4000


app.use("/api/v1/books", require("./routes/book.routes.js"))

app.listen(port, () => console.log(`app listening on port ${port}!`))

module.exports = app