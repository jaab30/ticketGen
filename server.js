const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");

const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongo database
const db = config.MONGO_URI;
// connet to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 8000;

app.use(routes);


app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
