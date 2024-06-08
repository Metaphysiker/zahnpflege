const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../../models/user");

router.post("/register", async (req, res) => {
  try {

    let userExists = await UserModel.exists({ email_uppercase: req.body.email.toUpperCase() });
    if (userExists) {
      res.status(201).json({ message: "e-Mail already exists" });
    }

    let user = await UserModel.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const filter = { email_uppercase: req.body.email.toUpperCase() };
    const user = await UserModel.findOne(filter);

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const validate = await user.isValidPassword(req.body.password);

    if (!validate) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ message: "Logged in successfully", token });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
