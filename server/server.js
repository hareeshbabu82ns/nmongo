const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const Todo = require('./db/models/todo');
const User = require('./db/models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var newTodo = new Todo(req.body);
  newTodo.save().then((doc) => {
    console.log('Todo Created: ', doc);
    res.status(201).send({ id: doc._id });
  }, (err) => {
    console.log('Unable to Save Todo', err);
    res.status(400).send(err);
  });
});

//start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});


// //create sample Todo
// var newTodo = new Todo({ text: "Make it Happen" });
// //save to DB
// newTodo.save().then((doc) => {
//   console.log('Todo Created: ', doc);
// }, (err) => {
//   console.log('Error: ', err);
// });

// //create sample User
// var newUser = new User({ name: "Hareesh Polla", email: "h@g.com" });
// //save user to DB
// newUser.save().then((data) => {
//   console.log('User Saved: ', data);
// }, (err) => {
//   console.log('Error saving User:', err);
// });