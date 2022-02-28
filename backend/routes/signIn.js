//joi=> input from user
//does the user exist
//validate password
//jwt => send to client

const joi = require("joi");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  //optional
  const joiSchema = joi.object({
    email: joi.string().min(3).max(100).email().required(),
    password: joi.string().min(6).max(1000).required(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  //upto here
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password...");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password...");
    }
    //jwt.sign(payload, secret variable)
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
