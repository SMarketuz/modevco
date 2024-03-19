const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const Contact = mongoose.model('Contact' , contactSchema)

exports.Contact = Contact 