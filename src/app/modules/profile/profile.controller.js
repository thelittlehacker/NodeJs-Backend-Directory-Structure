const _profileService = require('./profile.services')
const errors = {}

exports.createAndUpdateProfile = async (req, res, next) => {
    try {
        const profilePayload = req.body
        const result = await _profileService.doCreateOrUpdateProfile(profilePayload)
        if (result.status === true) {
            return res.success.OK(result.data.message, { response: result.data })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.UnprocessableEntity("Failed to create User Profile", { errors })
        }
    } catch (error) {
        next(error)
    }

}

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const result = await _profileService.doGetProfile(userId)
        if (result.status === true) {
            return res.success.OK('User profile Fetched, Successfully!', { response: result.data })
        }
        if (result.status === false) {
            errors.response = result.data
            return res.error.UnprocessableEntity("Failed to fetch User Profile", { errors })
        }

    } catch (error) {
        next(error)
    }
}

exports.generatePreSignedUrl = async (req, res, next) => {
    try {
        const result = await _profileService.generatePreSignedUrl();
        if (result.status === true) {
            return res.success.OK('Presigned URL generated Successfully!', { response: result.data })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.UnprocessableEntity("Failed to fetch User Profile", { errors })
        }
    } catch (error) {
        next(error)
    }

}