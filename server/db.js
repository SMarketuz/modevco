const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb+srv://mirsoonuzbsila001:5B45w3guY8KhYFFq@cluster0.oo8yqav.mongodb.net/modevco')
    .then(() => {
        console.log('Mongo ishladi');
    }).catch((err) => {
        console.log('Mongoda hatolik bor', err);
    })
     
}

 