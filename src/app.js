const dotenv = require("dotenv");
const connectToDatabase = require("./db/connect");
dotenv.config();
const express = require("express");
const app = express();
const user = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTSecret = "palmeirastemmundial";
const mongoose = require("mongoose");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

connectToDatabase();
let User = mongoose.model("User", user);

app.get("/", (req, res) => {
    res.json({});
});

app.post("/user", async (req, res) => {
    if(req.body.name == "" || req.body.email == "" || req.body.password == "") {
        res.sendStatus(400);
        return;
    }

    try {
        let user = await User.findOne({"email": req.body.email});

        if(user != undefined) {
            res.statusCode = 400;
            res.json({error: "E-mail já cadastrado"});
            return;
        }

        let password = req.body.password;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let newUser = new User({name: req.body.name, email: req.body.email, password: hash});
        await newUser.save();
        res.json({email: req.body.email});
    } catch(err) {
        res.sendStatus(500);
    }
});

app.post("/auth", async (req, res) => {
    let {email, password} = req.body;
    jwt.sign({email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
        if(err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            res.json({ token });
        }
    });
});

app.delete("/user/:email", async (req, res) => {
    await User.deleteOne({"email": req.params.email});
    res.sendStatus(200);
})

module.exports = app;