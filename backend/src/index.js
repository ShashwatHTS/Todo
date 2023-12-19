const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

app.use("/api/v1/books", require("./routes/book.routes.js"))

app.listen(port, () => console.log(`app listening on port ${port}!`))

module.exports = app