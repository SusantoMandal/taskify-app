const User = require("./userSchema")

const getAllTasks = async (userData) => {
  try {
    const user =  await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) {
      const error = new Error('user not found');
      error.code = "ERR_103";
      throw error;
    }
    return user.tasks
  } catch(err) {
    if(err.code !== "ERR_103") {
      err.code = "ERR_999";
    }
    throw err;
  }
}

const addTask = async (userData, task)=> {
  try {
    const user =  await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) {
      const error = new Error('user not found');
      error.code = "ERR_103";
      throw error;
    }
    user.tasks.push(task);
    const { tasks } = await user.save();
    const addedTask = tasks[tasks.length - 1];
    return addedTask;
  }catch(err){
    if(err.code !== "ERR_103") {
      err.code = "ERR_999";
    }
    throw err;
  } 

}

const updateStatus = async (userData, taskId)=> {
  try {
    const user = await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) {
      const error = new Error('user not found');
      error.code = "ERR_103";
      throw error;
    }
    const task = user.tasks.id(taskId);
    if(task == null) {
      const error = new Error('task not found');
      error.code = "ERR_303";
      throw error;
    }
    task.completed = !task.completed; 
    const filter = {
      "email" : userData.email,
      "tasks._id": taskId 
    }
    const update = { 
      "$set": {
          "tasks.$.completed": task.completed
      }
    }
    User.findOneAndUpdate(filter,update, () =>  {})
    return task;
  } catch(err) {
    if(err.code !== "ERR_103" && err.code !== "ERR_303") {
      err.code = "ERR_999"
    }
    throw err;
  }
  
}

const deleteTask = async (userData,taskId)=> {
  try {
    const user = await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) { 
      const error = new Error('user not found');
      error.code = "ERR_103";
      throw error;
    }
    const task = user.tasks.id(taskId);
    if(task == null) {
      const error = new Error('task not found');
      error.code = "ERR_303";
      throw error;
    }
    task.remove();
    await user.save();
    return task;
  } catch(err) {
    if(err.code !== "ERR_103" && err.code !== "ERR_303") {
      err.code = "ERR_999"
    }
    throw err;
  }
}

module.exports = {
  getAllTasks,
  addTask,
  updateStatus,
  deleteTask
}