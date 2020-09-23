const Profile = require('./profile.model');
const config = require('./../../../config/env/config');
const uuid4 = require('uuid4');
const AWS = require('aws-sdk')
const s3 = new AWS.S3({ accessKeyId: config.aws.iam.accessKeyId, secretAccessKey: config.aws.iam.secretAccessKey, useAccelerateEndpoint: true })

exports.doCreateOrUpdateProfile = async (userProfileData) => {
    const checkIfExist = await Profile.findOne({ userId: userProfileData.userId });
    if (checkIfExist) {
        const updateProfile = await Profile.findOneAndUpdate({ userId: userProfileData.userId }, userProfileData);
        if (updateProfile) {
            return {
                status: true,
                data: {
                    message: "User profile updated, Successfully!",
                    profile: updateProfile
                }

            }
        }

    }
    const createProfile = await Profile.create(userProfileData)
    if (createProfile) {
        return {
            status: true,
            data: {
                message: "User profile created, Successfully!",
                profile: createProfile
            }

        }
    } else {
        return {
            status: false,
            data: {
                message: "Failed to create user profile",
                profile: {}
            }

        }
    }
    return createProfile;
}

exports.doGetProfile = async (userId) => {
    const userProfile = await Profile.findOne({ userId }).select("-__v");
    if (userProfile) {
        return {
            status: true,
            data: {
                message: "User profile Fetched, Successfully!",
                profile: userProfile
            }

        }
    } else {
        return {
            status: false,
            data: {
                message: "Failed to fetch User profile!",
                profile: {}
            }
        }
    }
    return userProfile
}


exports.generatePreSignedUrl = async () => {
    try {
        const signedUrlExpireSeconds = 60 * 5;
        const myBucket = config.aws.s3.bucket;
        const myKey = uuid4();
        let key = "profilePics/" + myKey + ".jpg";

        const params = {
            Bucket: myBucket,
            Key: key,
            Expires: signedUrlExpireSeconds,
            ACL: `public-read`,
            ContentType: `png/jpeg`,
        };

        const url = await s3.getSignedUrl('putObject', params);
        if (url) {
            let getUrl = url.split("?");
            let urls = {
                putUrl: url,
                getUrl: getUrl[0]
            }
            return {
                status: true,
                data: {
                    message: "Presigned URL generated Successfully",
                    URL: urls
                }
            };
        } else {
            return {
                status: false,
                data: {
                    message: "Failed to generate Presigned URL!",
                    URL: {}
                }
            };
        }
    } catch (error) {
        console.log(error)
    }
};