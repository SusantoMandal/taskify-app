const userService = require('../models/user');
const { isSignUpValid, isSignInValid } = require("../utils/validation");
const { generateAuthToken } = require('../utils/authTokenizaton');

signUpUser = async (req, res) => {
  try {
      const userData = req.body;
      isSignUpValid(userData);
      const userEmail = await userService.addUser(userData);
      const user = { email: userEmail };
      const accessToken = generateAuthToken(user);
      res.status(201).send({accessToken,userName: userData.name});
  } catch(err) {
      res.send({
        error: err.message,
        code: err.code
      });
  }
}

signInUser = async(req,res) => {
  try{
      const userData = req.body;
      isSignInValid(userData);
      const {userEmail,userName} = await userService.getUser(userData);
      const user = { email: userEmail };
      const accessToken = generateAuthToken(user);
      res.send({accessToken, userName});
  } catch(err) {
      res.send({
        error: err.message,
        code: err.code
      });
  }
}

authenticateUser = async (req, res) => {
  try{
    const userData = req.user;
    if(userData !== null) {
      res.send('Valid token');
    }
  } catch(err) {
    res.status(403).send(JSON.parse(err.message));
  }
}

module.exports = { signUpUser, signInUser, authenticateUser };

