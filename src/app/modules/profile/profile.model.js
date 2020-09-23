const mongoose = require('mongoose');
const Schema = mongoose.Schema

const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary'],
        required: true
    },

    cityName: {
        type: String,
        required: true
    },

    isSameHomeTown: {
        type: Boolean,
        default: false,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    interest: {
        type: Array
    },
    profession: {
        type: String
    },
    educationQualification: {
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String,
            required: true
        }
    },

    isPursuing: {
        type: Boolean,
        default: false,
        required: true
    },

    profilePicture: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = User = mongoose.model('profile', profileSchema);