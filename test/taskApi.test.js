
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const expect = chai.expect;
chai.use(chaiHttp);

let id = null;

describe('Testing rest api', () => {

    describe('GET /task', () => {
      it('it should get all the tasks', (done) => {
        chai.request(server)
        .get('/task')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("array");
        done();
        })
      })
      it('it should not return all the tasks', (done) => {
        chai.request(server)
        .get('/tasks')
        .end((err, res) => {
          expect(res.status).to.equal(404);
        done();
        })
      })
    })
  
    describe('POST /task', () => {
      it('it should create a new task', (done) => {
        const task = {
          "description": "test rest api"
        }
        chai.request(server)
        .post('/task')
        .send(task)
        .end((err, res) => {
          id = res.body._id;
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('completed');
          expect(res.body.description).to.equal(task.description);
          expect(res.body.completed).to.be.false;
        done();
        })
      })
      it('should not create a task if description is not provided', (done) => {
        const task = {
        }
        chai.request(server)
        .post('/task')
        .send(task)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('Description is necessary for adding a new task.');
        done();
        })
      })
    })
  
    describe('PUT /task/:id', () => {
      it('update a task by id', (done) => {
        chai.request(server)
        .put('/task/' + id)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('completed');
          expect(res.body.completed).to.be.true;
  
        done();
        })
      })
      it('task is not found for updation', (done) => {
        const taskId = -10;
        chai.request(server)
        .put('/task/' + taskId)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        done();
        })
      })
    })
  
    describe('DELETE /task/:id', () => {
      it('delete a task by id', (done) => {
        chai.request(server)
        .delete('/task/' + id)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('completed');
        done();
        })
      })
      it('task not found for deletion', (done) => {
        const taskId = -10;
        chai.request(server)
        .delete('/task/' + taskId)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        done();
        })
      })
    })
  
  })