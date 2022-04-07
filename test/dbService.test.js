const chai = require('chai');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema');
const chaiAsPromised = require('chai-as-promised')
const user = require('../models/user');
const task = require('../models/task'); 

const expect = chai.expect;
chai.use(chaiAsPromised)

let userId = null;
let taskId = null;

const newUser = {
  name : 'unit-test-user',
  password: 'compro'
}

const newTask = {
  description: 'unit testing'
}

before((done) => {
  mongoose.connect("mongodb://localhost/task_app",{ useNewUrlParser: true})
  .then(async () => {
    console.log("connection is successfull");
    await userSchema.find(newUser).deleteOne();
    console.log('droping document of unit-test-user');
    done();
  })
  .catch((error) => console.log(error));
});

describe('Testing User methods', ()=> {
  describe('add user in database', ()=> {
      it('should return new user data', async()=> {
        const data = await user.addUser(newUser);
        userId = data._id;
        expect(data).to.be.a("object");
        expect(data).to.have.property('_id');
        expect(data).to.have.property('name');
        expect(data).to.have.property('password');
        expect(data).to.have.property('tasks');
        expect(data.name).to.eql(newUser.name);
        expect(data.tasks).to.be.an("array");
      });

      it('adding existing user', async ()=> {
        await expect(user.addUser(newUser)).to.be.rejectedWith('name must be unique');
      })
  })

  describe('get user from database', ()=> {
      it('should return the user ID', async()=> {
        const data = await user.getUser(newUser);
        expect(data).to.be.a("object");
        expect(data).to.eql(userId);
      });

      it('get non-existing user from database', async ()=> {
        const userData = {
          name: 'ab',
          password: '1234'
        }
        await expect(user.getUser(userData)).to.be.rejectedWith('user is not present');
      })
  })
});

describe('Testing Task methods', ()=> {

  describe('add a new task for a user', ()=> {
    it('should return a new task', async ()=> {
      const data = await task.addTask(userId, newTask);
      taskId = data._id;
      expect(data).to.be.a("object");
      expect(data).to.have.property('_id');
      expect(data).to.have.property('description');
      expect(data).to.have.property('completed');
      expect(data.description).to.equal(newTask.description);
      expect(data.completed).to.be.false;  
    })

    it('adding task in non-existing user', async ()=> {
      const id = -1;
      await expect(task.addTask(id, newTask)).to.be.rejectedWith(Error);
    })
  })

  describe('get all task for a user', ()=> {
    it('should return all the task', async()=> {
      const data = await task.getAllTasks(userId);
      expect(data).to.be.a("array");
      expect(data).to.have.lengthOf(1);
    })

    it('getting task for non-existing user', async ()=> {
      const id = -1;
      await expect(task.getAllTasks(id)).to.be.rejectedWith(Error);
    })

  })

  describe('update task for a user', ()=> {
    it('should update a task', async()=> {
      const data = await task.updateStatus(userId, taskId);
      expect(data).to.be.a("object");
      expect(data).to.have.property('_id');
      expect(data).to.have.property('description');
      expect(data).to.have.property('completed');
      expect(data.completed).to.be.true;
    })

    it('updating task for non-existing user', async ()=> {
      const id = -1;
      await expect(task.updateStatus(id, taskId)).to.be.rejectedWith(Error);
    })

    it('updating task for non-existing task', async ()=> {
      const id = -1;
      await expect(task.updateStatus(userId, id)).to.be.rejectedWith(Error);
    })
  })

  describe('delete task for a user', ()=> {
    it('should delete a task', async()=> {
      const data = await task.deleteTask(userId, taskId);
      expect(data).to.be.a("object");
      expect(data).to.have.property('_id');
      expect(data).to.have.property('description');
      expect(data).to.have.property('completed');
    })

    it('updating task for non-existing user', async ()=> {
      const id = -1;
      await expect(task.deleteTask(id, taskId)).to.be.rejectedWith(Error);
    })

    it('updating task for non-existing task', async ()=> {
      const id = -1;
      await expect(task.deleteTask(userId, id)).to.be.rejectedWith(Error);
    })
  })

})

