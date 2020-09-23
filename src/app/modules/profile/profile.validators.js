const errorParser = require('./../../common/helpers/error.parser');

const {
    userCreateProfileSchema
} = require('./validators/other.validator');

exports.validateCreateProfileSchema = async (req, res, next) => {
    const { error } = userCreateProfileSchema.validate(req.body)
    if (!error) next();
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
};