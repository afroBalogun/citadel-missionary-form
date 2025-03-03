const mongoose = require("mongoose")

// firstname, Lastname, departent, additional departments, date, gender

const AttendanceSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
        },
    department: {
        type: [String], 
        default: [],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"] // Ensures only "male" or "female" is stored
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;

