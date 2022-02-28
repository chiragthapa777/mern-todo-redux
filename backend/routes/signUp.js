//joi to validate the incoming info
//check if the user exist or not
//if not create a new user
//hash the password =>bcrypt or bcryptjs
//save user

const joi = require("joi");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  //optional
  const joiSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(3).max(100).email().required(),
    password: joi.string().min(6).max(1000).required(),
  });
  const { error } = joiSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  // upto here

  try {

    //checking unique email
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with that email already exist...");

    const {name, email, password}= req.body 
    user = new User({name, email, password})

    //using bcryptjs
    //salt is random string of string
    const salt = await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(user.password, salt);
    await user.save()

    // res.send("User created")
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );
    res.send(token);

  } catch (error) {
    res.status(500).send(error.message); 
  }
});

module.exports= router
