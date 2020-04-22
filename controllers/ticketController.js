const UserTicket = require("../models/UserTicket");
const User = require("../models/user");



module.exports = {

    findAll: function (req, res) {
        UserTicket.find()
            .then(tickets => res.json(tickets))
            .catch(err => console.log(err));

    },
    save: function (req, res) {

        const { tixId, date, subject, description, status, userId } = req.body;
        if (!subject || !description) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }

        const newTicket = new UserTicket({
            tixId,
            date,
            subject,
            description,
            status
        });

        newTicket.save()
            .then(({ _id }) => User.findByIdAndUpdate({ _id: userId }, { $push: { tickets: _id } }, { new: true }))
            .then(data => res.json(data))
            .catch(err => console.log(err));
    },
    addComment: function (req, res) {

        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }

        UserTicket.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } }, { new: true })
            .then(data => res.json(data))
            .catch(err => console.log(err));
    },
    delete: function (req, res) {
        UserTicket.findByIdAndDelete(req.params.id)
            .then(items => res.json({ success: true }))
            .catch(err => console.log(res.status(404).json({ success: false })));
    },
    imageUpload: function (req, res) {
        console.log("image", req.file);
        console.log("image", req.body);
        console.log("image", req.name);

        res.json({ file: req.file });
    }

}