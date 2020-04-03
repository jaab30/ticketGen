const Boiler = require("../models/boiler");

module.exports = {

    findAll: function (req, res) {
        Boiler.find()
            .then(items => res.json(items))
            .catch(err => console.log(err));

    },
    save: function (req, res) {
        const newBoiler = new Boiler({
            name: req.body.name
        });

        newBoiler.save()
        .then( item => res.json(item))
    },
    delete: function (req, res) {
        Boiler.findByIdAndDelete(req.params.id)
            .then(items => res.json({ success: true }))
            .catch(err => console.log(res.status(404).json({ success: false })));
    }

}