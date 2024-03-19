const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        max: 12,
    },
    username: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 10
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const User = mongoose.model('User' , userSchema)

exports.User = User