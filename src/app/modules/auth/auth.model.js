const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

    phone: {
        countryCode: { type: String },
        countryName: { type: String },
        mobileNumber: {
            type: String,
            unique: true
        }
    },

    facebook: {
        userId: {
            type: String,
            unique: true
        },
        email: { type: String }
    },

    google: {
        email: {
            type: String,
            unique: true
        }
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = User = mongoose.model('user', userSchema);