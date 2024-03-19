const { default: mongoose } = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
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


const Email = mongoose.model('Email' , emailSchema)

exports.Email = Email 