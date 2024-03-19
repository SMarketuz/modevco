const { default: mongoose } = require("mongoose");

const faktSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Fakt = mongoose.model('Fakt' , faktSchema)
exports.Fakt = Fakt