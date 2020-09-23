const Joi = require('joi');

const userCreateProfileSchema = Joi.object().keys({
    userId: Joi
        .string()
        .required(),

    firstName: Joi
        .string()
        .required(),

    lastName: Joi
        .string()
        .required(),

    gender: Joi
        .string()
        .required(),

    cityName: Joi
        .string()
        .required(),

    isSameHomeTown: Joi
        .boolean()
        .required(),

    age: Joi
        .number().
        greater(10)
        .required(),

    educationQualification: Joi
        .object({
            degree: Joi.string().required(),
            fieldOfStudy: Joi.string().required()
        })
        .required(),

    isPursuing: Joi
        .boolean()
        .required(),

    interest: Joi
        .array(),

    profession: Joi
        .string(),

    profilePicture: Joi
        .string()

});


module.exports = {
    userCreateProfileSchema
};