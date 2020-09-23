const _profileController = require('./profile.controller');
const _profileValidator = require('./profile.validators');
const { _authMiddleware } = require('../../common/middleware/auth.middleware')
const prefix = '/api/v1/profile';

module.exports = (app) => {

    app
        .route(prefix + '/')
        .all(_authMiddleware)
        .get(_profileController.getProfile);

    app
        .route(prefix + '/')
        .all(_authMiddleware, _profileValidator.validateCreateProfileSchema)
        .post(_profileController.createAndUpdateProfile);

    app
        .route(prefix + '/presignedurl')
        .get(_profileController.generatePreSignedUrl);



}