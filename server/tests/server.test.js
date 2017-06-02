const expect = require('expect');
const request = require('supertest');

const app = require('../server');
const Todo = require('../db/models/todo');

const sampleTodos = [{ text: "test todo1" }, { text: "test todo2" }];


//run this before each test script "it()"
beforeEach((done) => {
  //remove all Todos from DB
  Todo.remove({}).then(() => {
    Todo.insertMany(sampleTodos).then(() => done());
  });
});

describe('GET /todos', () => {
  it('should have 2 Todos', (done) => {
    request(app)
      .get('/todos')
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  });
});

describe('POST /todos', () => {

  it('should not create Todo with wrong data', (done) => {
    request(app)
      .post('/todos')
      .send({ completed: false })
      .expect(400)
      .end((err, res) => {
        done(err);
      })
  });

  it('should create new Todo', (done) => {
    var text = 'todo something';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(201)
      .expect((res) => {
        expect(res.body).toIncludeKey('id');
      }).end((err, res) => {
        if (err) {
          return done(err); //finish with error
        }

        //get all todos
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done(); //everything is OK, finish
        }).catch((err) => {
          done(err); //finish with error
        })
      });
  });
});