const config = require('./../../../config/env/config');
const jwt = require('jsonwebtoken');

exports._authMiddleware = async (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            let token = req.headers['authorization'];
            if (token.startsWith('bearer ')) {
                token = token.slice(7, token.length);
                const result = await jwt.verify(token, config.token.access_token_secret)
                if (result) {
                    req.body.userId = result.data.userId;
                    next();
                } else {
                    res.error.BadRequest("Token is not valid OTP token", {
                        errors: {
                            message: "Not Valid OTP Token",
                            info: "Please send valid OTP token, which you have got on the verify mobile number"
                        }
                    })
                }
            } else {
                res.error.Unauthorized('Unauthorized', {
                    errors: {
                        message: 'Token Missing In Request, Please login or register..',
                        info: 'Token needs to authorize to access requests.'
                    }
                });
            }

        } else {
            res.error.BadRequest("Bad Request", {
                errors: {
                    message: "Missing header",
                    info: "Header is missing in the request, Please add header to access resource"
                }
            })
        }
    } catch (error) {
        res.error.Unauthorized('Unauthorized', {
            errors: {
                message: 'Token Missing In Request, Please login or register..',
                info: 'Token needs to authorize to access requests.',
                error
            }
        });
    }
}

