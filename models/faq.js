const { default: mongoose } = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
    
});

const Faq = mongoose.model('Faq' , faqSchema);
exports.Faq = Faq;