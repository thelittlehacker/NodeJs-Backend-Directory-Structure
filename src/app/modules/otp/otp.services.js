const OTP = require('./otp.model')

exports.doCreateOTP = async (data) => {
    const checkIfExist = await OTP.findOne({ "mobileNumber": data.mobileNumber })
    if (checkIfExist) {
        checkIfExist.otp = 111111 // Math.floor(Math.random() * (999999 - 100000) + 100000)
        const updatedValue = await checkIfExist.save();
        return updatedValue
    } else {
        data.otp = 111111 //Math.floor(Math.random() * (999999 - 100000) + 100000)
        const otpResult = await OTP.create(data)
        return otpResult;
    }
}

exports.getOtpById = async (id) => {
    const OtpResult = await OTP.findById({ _id: id });
    return OtpResult;
}