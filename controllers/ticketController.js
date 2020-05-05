const UserTicket = require("../models/UserTicket");
const mongoose = require("mongoose");
const User = require("../models/user");
const Grid = require("gridfs-stream");
let gfs;

let db = mongoose.connection;
db.options = {};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection("uploads");
    console.info('GFS connection successful');
});


module.exports = {

    findAll: function (req, res) {
        UserTicket.find()
            .populate("uploads.files")
            .then(tickets => res.json(tickets))
            .catch(err => console.log(err));

    },
    save: function (req, res) {

        const { tixId, date, subject, description, images, status, userId } = req.body;
        if (!subject || !description) {
            return res.status(400).json({ msg: "Please enter Subject and Description fields" })
        }

        const newTicket = new UserTicket({
            tixId,
            date,
            subject,
            description,
            images,
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
    findOneFile: function (req, res) {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 0) {
                return res.status(404).json({ err: "No File Exists" })
            }
            return res.json(file);
        });
    },
    findFiles: function (req, res) {
        gfs.files.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({ err: "No Files Exist" })
            }
            return res.json(files);
        });
    },
    findOneImage: function (req, res) {

        gfs.files.findOne({ filename: req.params.imagename }, (err, file) => {

            if (!file || file.length === 0) {
                return res.status(404).json({ err: "No File Exists" })
            }

            if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({ err: "Not and image" })
            }
        });
    },
    imageUploadNewTix: function (req, res) {
        if (req.file === undefined) return res.status(404).json({ msg: "Please enter a file" })
        if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
            res.json({ file: req.file })

        } else {
            return res.status(404).json({ msg: "Not and image" })
        }


    },
    imageUpload: function (req, res) {
        console.log(req.file);
        if (req.file === undefined) return res.status(404).json({ msg: "Please enter a file" })
        if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
            UserTicket.findByIdAndUpdate(req.body.tixId, { $push: { images: req.file.filename } }, { new: true })
                .then(data => res.json(data))
                .catch(err => console.log(err));

        } else {
            return res.status(404).json({ msg: "Only PNG or JPG files please." })
        }


    },
    deleteProfileImage: function (req, res) {

        gfs.remove({ filename: req.params.imagename, root: "uploads" }, (err, gridStore) => {
            if (err) {
                return res.status(404).json({ err: err });
            }
            User.findByIdAndUpdate({ _id: req.params.userid }, { image: "" }, { new: true })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        })

    },
    imageDeleteNewTix: function (req, res) {

        gfs.remove({ filename: req.params.imagename, root: "uploads" }, (err, gridStore) => {
            if (err) {
                return res.status(404).json({ err: err });
            }
            console.log("GRIDSTAOR", gridStore);

            res.json(gridStore)
        })

    }
}