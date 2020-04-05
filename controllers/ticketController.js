const UserTicket = require("../models/UserTicket");
const User = require("../models/user");

module.exports = {

    findAll: function (req, res) {
        UserTicket.find()
            .then(items => res.json(items))
            .catch(err => console.log(err));

    },
    save: function (req, res) {

        const { tixId, date, subject, description, userId } = req.body;
        console.log(userId);

        const newTicket = new UserTicket({
            tixId,
            date,
            subject,
            description        
        });
        console.log(newTicket);
        newTicket.save()
        .then(({ _id }) => User.findByIdAndUpdate({ _id: userId }, { $push: { tickets: _id } }, { new: true }))
        .then( data => res.json(data))
        .catch(err => console.log(err));
    },
    delete: function (req, res) {
        UserTicket.findByIdAndDelete(req.params.id)
            .then(items => res.json({ success: true }))
            .catch(err => console.log(res.status(404).json({ success: false })));
    }

}