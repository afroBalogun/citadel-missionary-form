const express = require("express")
const router = express.Router()
const { postAttendance, getAllAttendance, getAttendanceByParameter} = require('./attendance.controller')

router.post('/submit-attendance', postAttendance);

router.get('/', getAllAttendance);

router.get('/find-attendance', getAttendanceByParameter);

module.exports = router;

