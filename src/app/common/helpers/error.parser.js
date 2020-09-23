// Validation Error Parser
exports.ValidationError = err => {
    let errRes = {};
    errRes.errors = err.details[0];
    delete errRes.errors._object;
    console.log(errRes)
    return errRes;
};

// Mongoose Error Parser
exports.parseMongooseError = err => {
    let error = {
        errors: err[Object.keys(err)[0]]
    };
    return error;
};
