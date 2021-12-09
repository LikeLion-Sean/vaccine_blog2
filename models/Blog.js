const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    vaccine: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    hospital: {
        type: String
    },
    feeling: {
        type: String
    },
    whenuGot: {
        type: Date,
        default: () => Date.now()
    },
    img: {
        type: String,
        default: 'name_img.jpg'
    }
})

module.exports = mongoose.model('Blog', blogSchema)