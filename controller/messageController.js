const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat")

//createMessage
const createMessage = async (req, res) => {
    const { content, chatId } = req.body

    var newMessage = new Message({
        sender: req.user._id,
        content: content,
        chat: chatId
    })

    try {
        var message = await Message.create(newMessage)
        message = await Message.populate(message, { path: "sender", select: "name image" });
        message = await Message.populate(message, { path: "chat" });
        message = await User.populate(message.chat, { path: "users", select: "name image email" })
        //update new message
        await Chat.findByIdAndUpdate(req.body.chatId, {
            message: message
        });

        res.status(200).json(message)
    } catch (error) {
        console.error("Failed to create message:", error);
        res.status(400).json({
            status: "error",
            message: "Failed to create message",
            error: error.message
        })
    }
}
//get message
const getMessage = async (req, res) => {
    const { chatId } = req.params;

    try {
        const message = await Message.find({ chatId })
        res.status(200).json(message)
    } catch (error) {
        console.error("Failed to get messages:", error);
        res.status(400).json
            (
                {
                    status: "error",
                    message: "Failed to get messages",
                    error: error.message
                });
    }
}

module.exports = { createMessage, getMessage }