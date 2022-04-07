const bcrypt = require('bcrypt');
const User = require("./userSchema")

const addUser = async (user)=> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const newUser = new User({
            email: user.email,
            name : user.name,
            password: hashPassword
        });
        const data = await newUser.save();
        return data.email;
    } catch(err) {
        if (err.code === 11000) {
            const error = new Error('email already exist');
            error.code = "ERR_102";
            throw error;
        }
        err.code = "ERR_999";
        throw err;
    }
}

const getUser = async(userData) => {
    try{
        const data = await User.findOne({ email: userData.email });
        if(data == null) {
            const error = new Error('user is not present');
            error.code = "ERR_103";
            throw error;
        }
        const validPassword = await bcrypt.compare(userData.password, data.password);
        if (!validPassword) {
            const error = new Error('Invalid Password');
            error.code = "ERR_103";
            throw error;
        }
        return data.email;
    } catch(err) {
        if(err.code !== "ERR_103") {
            err.code = "ERR_999";
        }
        throw err;
    }
}

module.exports = { addUser, getUser }