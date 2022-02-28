const { Todo } = require("../models/todo");
const express = require("express");
const joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/",auth, async (req, res) => {
  try {
    const todos = await Todo.find({uid:req.user._id});
    // console.log(todos);

    res.send(todos);
    // console.log(req.user)//req.user is playload which was attached to req during auth.js middleware
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.post("/",auth, async (req, res) => {
  //validating res.body by using joi
  const schema = joi
    .object({
      name: joi.string().min(3).max(200).required(),
      author: joi.string().min(3).max(30),
      uid: joi.string(),
      isComplete: joi.boolean(),
      date: joi.date(),
    })
    .options({ abortEarly: false }); //option is added soo all error are display otherwiaw only one error is displayed
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request i.e, client error

  //extracting properties
  const { name, author, isComplete, date, uid } = req.body;

  //making document
  let todo = new Todo({
    // name:req.body.name,
    name,
    author,
    isComplete,
    date,
    uid,
  });

  // todo.save().then(todo =>{ res.send(todo)}).catch(error=> console.error(error.message))//saves in db
  try {
    todo = await todo.save(); //saving in db
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message); //server error
    console.log(error.message);
  }
});

router.put("/:id",auth, async (req, res) => {
  const schema = joi
    .object({
      name: joi.string().min(3).max(200).required(),
      author: joi.string().min(3).max(30),
      uid: joi.string(),
      isComplete: joi.boolean(),
      date: joi.date(),
    })
    .options({ abortEarly: false }); //option is added soo all error are display otherwiaw only one error is displayed
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request i.e, client error
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("todo not found");

    const { name, author, isComplete, date, uid } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        name,
        author,
        isComplete,
        date,
        uid,
      },
      { new: true }
    );
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message); //server error
    console.log(error.message);
  }
});

router.patch("/:id",auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found");
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isComplete: !todo.isComplete },
      { new: true }
    );
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message); //server error
    console.log(error.message);
  }
});

router.delete("/:id",auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found");
    todo = await Todo.findByIdAndDelete(req.params.id);
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
