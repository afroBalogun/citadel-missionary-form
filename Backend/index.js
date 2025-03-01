const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")

require('dotenv').config();

// Middleware
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://citadel-missionary-form.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// Routes
const attendanceRoutes = require('./src/attendance/attendance.route')
app.use("/api/attendance", attendanceRoutes)

const adminRoutes = require('./src/admin/admin.route')
app.use("/api/admin", adminRoutes)

const departmentRoutes = require('./src/department/department.route')
app.use("/api/departments", departmentRoutes)

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL || 'your-default-db-url');
        console.log("MongoDB successfully connected!");

        // Start the server after DB connection is established
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit if DB connection fails
    }
}

main();

