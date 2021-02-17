const res = require("express");


let users = User.find().then(r => {
    res.send(r);
})