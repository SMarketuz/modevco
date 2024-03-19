const express = require('express')
const exphbs = require('express-handlebars')
require('dotenv').config()
const app = express()
const config = require('config')

require('./server/apis')(app)
require('./server/db')()

console.log(config.get('tokenKeyPrivate'));

const port = process.env.PORT || 3030
app.listen(port , () => {
    console.log(`${port} chi port ishga tushdi`);
})