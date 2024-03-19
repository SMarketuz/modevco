const { default: mongoose } = require("mongoose");


const courseSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    learn: [{
        type: String,
        required: true
    }],
    information: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    fakt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fakt'
    }
})

const Course = mongoose.model('Course' , courseSchema)
exports.Course = Course