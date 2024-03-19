const {Schema , model, default: mongoose} =  require('mongoose');


const videoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Video = model('Video' , videoSchema)
exports.Video = Video