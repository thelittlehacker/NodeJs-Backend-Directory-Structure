const Joi = require('joi');

const userGetOtpSchema = Joi.object().keys({
    mobileNumber: Joi
        .string()
        .min(10)
        .max(10)
        .length(10)
        .required()
});

const verifyOTPSchema = Joi.object().keys({
    otp: Joi
        .string()
        .length(6)
        .required()
});


const signUpGoogleSchema = Joi.object().keys({
    email: Joi
        .string()
        .email()
        .required()
});


const signUpFacebookSchema = Joi.object().keys({
    userId: Joi
        .string()
        .required()
});


module.exports = {
    userGetOtpSchema,
    verifyOTPSchema,
    signUpGoogleSchema,
    signUpFacebookSchema,
};