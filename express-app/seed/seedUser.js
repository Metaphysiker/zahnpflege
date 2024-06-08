const mongoose = require('mongoose');
const UserModel = require("../models/user");

const users = [
    new UserModel({
        email: "demo@mail.com",
        password: "demo"
    })
]

const seedData = async () => {
    try {
        for (let i = 0; i < users.length; i++) {
            let userExists = await UserModel.exists({email_uppercase: users[i].email.toUpperCase()});

            if(!userExists){
                UserModel.create(users[i]);
            }
        }
      } catch (err) {
        console.error(err);
      }
}

module.exports = seedData;
