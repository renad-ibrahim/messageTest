const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    }
}, {
    timestamps: true
})
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message