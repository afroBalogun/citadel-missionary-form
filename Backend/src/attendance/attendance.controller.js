const Attendance = require("./attendance.model");

const postAttendance = async (req, res) => {
    try {
        const { firstName, lastName, department, date, phoneNumber } = req.body;

        // Check if an attendance record already exists for the same person.
        const existingAttendance = await Attendance.findOne({ date, phoneNumber });

        if (existingAttendance) {
            return res.status(400).json({ message: "Attendance already recorded for this person in this department" });
        }

        // If no duplicate found, proceed to save attendance
        const newAttendance = new Attendance(req.body);
        const submitAttendance = await newAttendance.save();

        res.status(201).json({ message: "Attendance submitted successfully", data: submitAttendance });
    } catch (error) {
        console.error("Error submitting attendance:", error);
        res.status(500).json({ message: "Error submitting attendance", error });
    }
};


const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().sort({ createdAt: -1})
        res.status(200).json(attendance)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching the attendance", error})
    }
}

const getAttendanceByParameter = async (req, res) => {
    try {
        const { name, department, date, gender } = req.query;

        let query = {};

        if (name) query.$text = { $search: name };
        if (department) query.department = department;
        if (date) query.date = date;
        if (gender) query.gender = gender;

        let attendanceRecords;

        if (name) {
            attendanceRecords = await Attendance.find(query, {
                score: { $meta: "textScore" }
            }).sort({
                score: { $meta: "textScore" }
            });
        } else {
            attendanceRecords = await Attendance.find(query).sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            count: attendanceRecords.length,
            data: attendanceRecords
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};



module.exports = {
    postAttendance,
    getAllAttendance,
    getAttendanceByParameter
}