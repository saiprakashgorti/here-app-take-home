const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    uin: {
        type: String,
        required: true
    },
    netId: {
        type: String,
        required: false
    },
    classId: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    takenBy: {
        type: String,
        default: null
    },
    barcode: {
        type: String,
        default: null
    },
    isEncrypted: {
        type: Boolean,
        default: false
    },
    isWaived: {
        type: Boolean,
        default: false
    },
    reasonForWaiving: {
        type: String,
        default: null
    },
    waivedBy: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);