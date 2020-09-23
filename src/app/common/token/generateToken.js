const config = require('./../../../config/env/config')
const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
    if (data.purpose === 'otp') {
        const token = jwt.sign({ data }, config.token.otp_secret, { expiresIn: config.expiresIn._otpToken });
        return token;
    } else {
        const accessToken = jwt.sign({ data }, config.token.access_token_secret, { expiresIn: config.expiresIn._accessToken });

        const refreshToken = jwt.sign({ data }, config.token.refresh_token_secret, { expiresIn: config.expiresIn._refreshToken });

        return {
            accessToken, refreshToken
        }
    }
}