const sendMsg = require('aws-sns-sms');
const config = require('./../../../config/env/config');

const awsConfig = {
    accessKeyId: config.aws.iam.accessKeyId,
    secretAccessKey: config.aws.iam.secretAccessKey,
    region: config.aws.sns.region
};

const sendMessage = async (data) => {
    console.log(awsConfig);
    const msg = {
        "message": `Your OTP is ${data.otp}`,
        "sender": "SO",
        "phoneNumber": "+91" + data.mobileNumber
    };
    try {
        const response = await sendMsg(awsConfig, msg);
        console.log(response, "response");
        return response;
    } catch (err) {
        throw (err);
    }
}

module.exports = {
    sendMessage: sendMessage
}
