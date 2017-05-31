const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Todos', (err, db) => {
  if (err) {
    return console.log('Connection to MongoDB failed');
  }
  console.log('Connected to MongoDB');

  // db.collection('Todos').insertOne({
  //   text: 'todo nodejs',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(`Undable to Crete TODO`, err);
  //   }
  //   console.log(`Todo Created`, JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Hareesh Babu Polla',
  //   age: 33,
  //   location: 'Canada'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Failed to create User document', err);
  //   }
  //   console.log(`User Document Created at ${result.ops._id.getTimeStamp()}`,
  //     JSON.stringify(result.ops, undefined, 2));
  // });


  //Find All
  db.collection('Todos').find().toArray().then((todos) => {
    console.log('Todos:', JSON.stringify(todos, undefined, 2));
  });

  //Find by property
  db.collection('Todos').find({ completed: true }).toArray().then((todos) => {
    console.log('Completed Todos:', JSON.stringify(todos, undefined, 2));
  });

  //Find by ID (using ObjectID)
  db.collection('Todos').find({ _id: new ObjectID('592c125844210b37d026c1e0') })
    .toArray().then((todos) => {
      console.log('Todos by ID:', JSON.stringify(todos, undefined, 2));
    });

  // db.collection('Todos').deleteMany({ text: "todo nodejs" })
  //   .then((data) => {
  //     console.log('Result:', data.result);
  //   });
  // db.collection('Todos').deleteOne({ text: "Pray to God" })
  //   .then((data) => {
  //     console.log('Result:', data.result);
  //   });

  // db.collection('Todos').findOneAndDelete({ text: "todo nodejs" })
  //   .then((data) => {
  //     console.log('Deleted Record:', data.value);
  //   });

  db.collection('Todos')
    .findOneAndUpdate({ _id: new ObjectID("592c18db14c0f11543e55812") },
    {
      $set: {
        completed: false
      }
    }, {
      returnOriginal: false
    }).then((data) => {
      console.log('Updated Document: ', data);
    });

  // db.close();
})