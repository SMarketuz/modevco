const { default: mongoose } = require("mongoose");

const textSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
    
});

const Tex = mongoose.model('Tex' , textSchema);
exports.Tex = Tex;