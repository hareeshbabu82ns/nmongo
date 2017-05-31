const mongoose = require('./db/mongoose');
const Todo = require('./db/models/todo');
const User = require('./db/models/user');

//create sample Todo
var newTodo = new Todo({ text: "Make it Happen" });
//save to DB
newTodo.save().then((doc) => {
  console.log('Todo Created: ', doc);
}, (err) => {
  console.log('Error: ', err);
});

//create sample User
var newUser = new User({ name: "Hareesh Polla", email: "h@g.com" });
//save user to DB
newUser.save().then((data) => {
  console.log('User Saved: ', data);
}, (err) => {
  console.log('Error saving User:', err);
});