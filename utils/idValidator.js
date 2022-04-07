const mongoose = require('mongoose');

const isValidId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error(`Id ${id} is not valid`);
        err.code = "ERR_301";
        throw err;
    }
}

module.exports = isValidId;