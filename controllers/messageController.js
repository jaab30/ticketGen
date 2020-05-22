const UserMessage = require("../models/userMessage");

module.exports = {

    async getMessages(req, res) {
        try {
            const data = await UserMessage.find().populate("userId")
            res.json(data)
        } catch (err) {
            throw err;
        }
    },

    async postMessages(req, res) {
        try {
            const { subject, description, userId, isMessageNew } = req.body;

            if (!subject || !description) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            const messageObj = new UserMessage({
                userId,
                subject,
                description,
                isMessageNew
            })

            const data = await messageObj.save()
            res.json(data);

        } catch (err) {
            throw err;
        }
    },
    async updateMessageStatus(req, res) {
        try {
            const { isMessageNew } = req.body;
            const data = await UserMessage.findByIdAndUpdate(req.params.id, { isMessageNew }, { new: true })
            res.json(data)

        } catch (err) {
            throw err;
        }
    }
}