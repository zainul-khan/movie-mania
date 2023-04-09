const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    otpNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expiry: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const Otp = mongoose.model('Otp', OtpSchema);
module.exports = Otp;

