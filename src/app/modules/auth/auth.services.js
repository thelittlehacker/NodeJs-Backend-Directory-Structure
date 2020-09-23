const _otpService = require('./../otp/otp.services')
const token = require('./../../common/token/generateToken')
const { sendMessage } = require('./../../common/AWS/sns')
const User = require('./auth.model')



exports.doGetOTP = async (data) => {
    try {
        const doCreateOTPResponse = await _otpService.doCreateOTP(data)
        if (doCreateOTPResponse) {
            //await sendMessage({ otp: doCreateOTPResponse.otp, mobileNumber: data.mobileNumber })

            const otpToken = token.generateToken({
                mobileNumber: data.mobileNumber,
                purpose: 'otp',
                _id: doCreateOTPResponse._id,
            })
            return {
                status: true,
                data: {
                    token: otpToken,
                    otp: doCreateOTPResponse.otp // Remove in deployment
                }
            }
        } else {
            return {
                status: false,
                data: "Error while sending OTP, Try after some time!"
            }
        }
    } catch (error) {
        console.log("-----------------Auth Service--------------------")
        console.log(error.name)
        if (error.code === 11000) {
            return {
                errorType: "MongoDB",
                data: "OTP already sent, Retry after 15 min"
            }
        } else {
            console.log(JSON.stringify(error))
        }
    }
}

exports.doVerifyOTP = async (data) => {
    const { otpId, otp, mobileNumber } = data
    try {
        const otpResponse = await _otpService.getOtpById(otpId);
        if (otpResponse && otpResponse != null) {
            if (otpResponse.mobileNumber == mobileNumber && otpResponse.otp == otp) {
                const user = {
                    phone: {
                        countryCode: "+91",
                        countryName: "India",
                        mobileNumber
                    },
                };
                const doCheckIfUserExist = await User.findOne(user)
                if (doCheckIfUserExist) {
                    const { accessToken, refreshToken } = await token.generateToken({ userId: doCheckIfUserExist._id })
                    return {
                        status: true,
                        data: {
                            message: "User Authenticated successfully!",
                            token: {
                                accessToken, refreshToken
                            }
                        }
                    }
                }
                const doCreateUser = await User.create(user);
                if (doCreateUser) {
                    const { accessToken, refreshToken } = await token.generateToken({ userId: doCreateUser._id })
                    return {
                        status: true,
                        data: {
                            message: "User create successfully!",
                            token: {
                                accessToken, refreshToken
                            }
                        }
                    }
                }

            } else {
                return {
                    status: false,
                    data: "You have entered wrong OTP"
                }
            }
        } else {
            return {
                status: false,
                data: "OTP has expired, please Retry!"
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.doGoogleSignUp = async (data) => {
    try {
        let user = await User.findOne({ google: { email: data.email } });
        if (user && user != null) {
            const { accessToken, refreshToken } = token.generateToken({ userId: user._id })
            return {
                status: true,
                data: {
                    message: "User Authenticated successfully!",
                    token: {
                        accessToken, refreshToken
                    }
                }
            }
        }

        user = await User.create({ google: { email: data.email } });

        if (user) {
            const { accessToken, refreshToken } = token.generateToken({ userId: user._id })
            return {
                status: true,
                data: {
                    message: "User create successfully!",
                    token: {
                        accessToken, refreshToken
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.doFacebookSignUp = async (data) => {
    try {
        let user = await User.findOne({ facebook: { userId: data.userId } });

        if (user && user != null) {
            const { accessToken, refreshToken } = token.generateToken({ userId: user._id })
            return {
                status: true,
                data: {
                    message: "User Authenticated successfully!",
                    token: {
                        accessToken, refreshToken
                    }
                }
            }
        }

        user = await User.create({ facebook: { userId: data.userId } });

        if (user) {
            const { accessToken, refreshToken } = token.generateToken({ userId: user._id })
            return {
                status: true,
                data: {
                    message: "User create successfully!",
                    token: {
                        accessToken, refreshToken
                    }
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}