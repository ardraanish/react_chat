const Chat = require ('../model/chatModel')

exports.saveMessage = async(data)=>{
    try {
        const newMessage = new Chat({
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
        })
        await newMessage.save();
        console.log("Message saved to MongoDB");
        return newMessage
    } catch (error) {
        console.error("Error saving message:", error);
    }
}

exports.getMessage = async (req, res) => {
    const { sender, receiver } = req.params; 
console.log(sender,receiver,'ardraaaa')
    if (!sender || !receiver) {
        return res.status(400).json({ error: "Sender and Receiver are required." });
    }

    try {
        const messages = await Chat.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Error fetching messages" });
    }
};

