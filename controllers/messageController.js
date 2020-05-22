const UserMessage = require("../models/userMessage");

module.exports = {

    getMessages(req, res) {
        UserMessage.find()
            .populate("userId")
            .then(data => {
                res.json(data)
            })
            .catch(err => console.log(err));
    },

    postMessages(req, res) {

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

        messageObj.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
    },
    updateMessageStatus: function (req, res) {

        const { isMessageNew } = req.body;
        console.log(isMessageNew);
        console.log(req.params.id);

        UserMessage.findByIdAndUpdate(req.params.id, { isMessageNew }, { new: true })
            .then(data => {
                console.log(data);

                res.json(data)
            })
            .catch(err => console.log(err));
    },
}