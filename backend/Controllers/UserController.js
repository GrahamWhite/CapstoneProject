let express = require('express');
let db = require('mongoose');


const User = require('../backend/Schemas/User');


async function FindAllUsers(name) {
    let user = User.find().then(r => {
        return r;
    })
};