const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./db/models/todo');
const User = require('./db/models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var newTodo = new Todo(req.body);
  newTodo.save().then((doc) => {
    res.status(201).send({ id: doc._id });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ message: "ID not Valid" });
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({ message: 'Object Not Found' });
    }
    res.status(200).send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
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

module.exports = app;