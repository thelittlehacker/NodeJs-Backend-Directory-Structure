const errorParser = require('./../../common/helpers/error.parser');
const {
    userGetOtpSchema,
    verifyOTPSchema,
    signUpGoogleSchema,
    signUpFacebookSchema
} = require('./validators/other.validator');

exports.validateGetOTPSchema = async (req, res, next) => {
    const { error } = userGetOtpSchema.validate(req.body)
    if (!error) next();
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
};

exports.validateOTPSchema = async (req, res, next) => {
    const { error } = verifyOTPSchema.validate(req.body)
    if (!error) next();
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
}

exports.validateGoogleSchema = async (req, res, next) => {

    const { error } = signUpGoogleSchema.validate(req.body)
    if (!error) {
        next();
    }
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
}

exports.validateFacebookSchema = async (req, res, next) => {
    const { error } = signUpFacebookSchema.validate(req.body)
    if (!error) next();
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
}