const _authService = require('./auth.services')
const errors = {}

exports.getOTP = async (req, res, next) => {
    try {
        const otpPayload = req.body
        const result = await _authService.doGetOTP(otpPayload)
        if (result.status === true) {
            return res.success.OK('OTP sent Successfully!', { response: result.data })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest("Failed to sent OTP", { errors })
        }

        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity("OTP already sent", { errors })
        }
    } catch (error) {
        next(error)
    }
}

exports.verifyOTP = async (req, res, next) => {
    try {
        const verifyOtpPayload = req.body
        const result = await _authService.doVerifyOTP(verifyOtpPayload)
        if (result.status === true) {
            return res.success.OK('OTP verified Successfully!', { response: result.data })
        }
        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest("Failed to verify OTP", { errors })
        }
    } catch (error) {
        next(error)
    }

}

exports.signUpGoogle = async (req, res, next) => {
    try {
        const googleSignupPayload = req.body
        const result = await _authService.doGoogleSignUp(googleSignupPayload);
        if (result.status === true) {
            return res.success.OK('Authenticated', { response: result.data })
        } if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest("Failed to verify OTP", { errors })
        }
    } catch (error) {
        next(error)
    }
}

exports.signUpFacebook = async (req, res, next) => {
    try {
        const facebookSignupPayload = req.body
        const result = await _authService.doFacebookSignUp(facebookSignupPayload);
        if (result.status === true) {
            return res.success.OK('Authenticated', { response: result.data })
        } if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest("Failed to verify OTP", { errors })
        }
    } catch (error) {
        next(error)
    }
}

