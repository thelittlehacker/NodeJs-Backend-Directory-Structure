const _authController = require('./auth.controller');
const _authValidator = require('./auth.validators');
const { _otpMiddleware } = require('../../common/middleware/otp.middleware')
const prefix = '/api/v1/auth';

module.exports = (app) => {
    app
        .route(prefix + '/otp')
        .all(_authValidator.validateGetOTPSchema)
        .post(_authController.getOTP);

    app
        .route(prefix + '/verify')
        .all(_authValidator.validateOTPSchema, _otpMiddleware)
        .post(_authController.verifyOTP);

    app
        .route(prefix + '/google')
        .all(_authValidator.validateGoogleSchema)
        .post(_authController.signUpGoogle)


    app
        .route(prefix + '/facebook')
        .all(_authValidator.validateFacebookSchema)
        .post(_authController.signUpFacebook)

}
