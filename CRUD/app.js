const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./usermodel');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mongopractice")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("hey");
});


app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: "harshita",
        email: "lucky@gmail.com",
        username: "harshita"
    });

    res.send(createduser);
});

app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate(
        { username: "luckuu" },
        { name: "honeyyyy" },
        { new: true }
    );

    res.send(updateduser);
});

app.get("/read", async (req,res) => {
    let users = await userModel.find({username: "luckuu"});
    res.send(users);
})


app.get("/delete", async (req,res) => {
    let users = await userModel.findOneAndDelete({username: "luckuu"});
    res.send(users);
})



app.listen(5000, () => console.log("Server running on port 5000"));
