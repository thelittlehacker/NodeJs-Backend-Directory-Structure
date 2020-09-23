const mongoose = require('mongoose');
const Schema = mongoose.Schema

const otpSchema = new Schema({
    mobileNumber: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '15m' },
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = User = mongoose.model('otp', otpSchema);