const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const path = require("path");

const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve up static assets (usually on heroku) */
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, './client/build')));
};

//mongo database
const db = config.MONGO_URI;
// connet to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
