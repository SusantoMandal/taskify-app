const express = require('express');
const router = express.Router();

const { getAllTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { signUpUser, signInUser, authenticateUser } = require('../controllers/userController');
const { verifyAuthToken } = require('../utils/authTokenizaton');

//add user
router.post('/signup', signUpUser);

//get user
router.post('/signin', signInUser);

// authenticate user
router.get('/authenticate', verifyAuthToken, authenticateUser);

// get all tasks
router.get('/tasks', verifyAuthToken, getAllTasks);

//create a new task
router.post('/tasks', verifyAuthToken, addTask);

//update task
router.put('/tasks/:tid', verifyAuthToken, updateTask);

//delete task
router.delete('/tasks/:tid', verifyAuthToken, deleteTask);

module.exports = router;