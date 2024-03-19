const { default: mongoose } = require("mongoose");

const futureSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    direct: {
        type: String,
        required: true
    },
    production: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Future = mongoose.model('Future' , futureSchema);
exports.Future = Future;