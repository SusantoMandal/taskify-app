const taskService = require('../models/task');
const { isTaskValid } = require("../utils/validation");
const isValidId = require('../utils/idValidator');

getAllTasks = async (req, res) =>  {
    try {
        const userData = req.user;
        const result = await taskService.getAllTasks(userData);
        res.send(result);
    } catch(err) {
        res.status(404).send({
            error: err.message,
            code: err.code
        });
    }
}

addTask = async (req,res) => {
    try {
        const userData = req.user;
        const taskData = req.body;
        isTaskValid(taskData);
        const result = await taskService.addTask(userData, taskData);
        res.status(201).send(result);
    } catch(err) {
        res.status(404).send({
            error: err.message,
            code: err.code
        });
    }
}

updateTask = async (req,res) => {
    try {
        const userData = req.user;
        const taskId = req.params.tid;
        isValidId(taskId);
        const result =  await taskService.updateStatus(userData, taskId);
        res.status(201).send(result);
    } catch(err) {
        res.status(404).send({
            error: err.message,
            code: err.code
        });
    }
}

deleteTask = async (req,res) => {
    try {
        const userData = req.user;
        const taskId = req.params.tid;
        isValidId(taskId);
        const result = await taskService.deleteTask(userData, taskId);
        res.status(201).send(result);
    } catch(err) {
        res.status(404).send({
            error: err.message,
            code: err.code
        });
    }
}

module.exports = { getAllTasks, addTask, updateTask, deleteTask };