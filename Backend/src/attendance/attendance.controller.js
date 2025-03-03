const Attendance = require("./attendance.model");

const postAttendance = async (req, res) => {
    try {
        const { firstName, lastName, department } = req.body;

        // Check if an attendance record already exists for the same person in the same department
        const existingAttendance = await Attendance.findOne({ firstName, lastName, department });

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
        // Extract parameters 
        const { department, date, gender } = req.query;

        // Build a query object dynamically
        let query = {};
        if (department) query.department = department;
        if (date) query.date = date;
        if (gender) query.gender = gender;

        // Fetch records from MongoDB
        const attendanceRecords = await Attendance.find(query);

        // Send response
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