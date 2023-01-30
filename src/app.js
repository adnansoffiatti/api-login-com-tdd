const dotenv = require("dotenv");
const connectToDatabase = require("./db/connect");
dotenv.config();
const express = require("express");
const app = express();
const user = require("./models/User");
const mongoose = require("mongoose");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

connectToDatabase();
let User = mongoose.model("User", user);

app.get("/", (req, res) => {
    res.json({});
});

app.post("/user", async (req, res) => {
    try {
        let newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password});
        await newUser.save();
        res.json({email: req.body.email});
    } catch(err) {
        res.sendStatus(500);
    }
});

module.exports = app;