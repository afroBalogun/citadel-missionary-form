const express = require('express')
const Admin = require('./admin.model')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/login", async(req, res) => {
    const {username, password} = req.body;
    try {
        const admin = await Admin.findOne({username}) 
        if(!admin){
            res.status(404).send({ message: "Admin not found!"})
        }
        if(admin.password !== password) {
            res.status(404).send({message: "Invalid Password!"})
        }
        const token = jwt.sign({id: admin._id, username : admin.username},
            JWT_SECRET,
            {expiresIn: "1h"}
        )  

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            admin: {
                username: admin.username,
            }    
        })

    } catch (error) {
        console.error("Failed to log in as admin", error)
        res.status(401).send({message: "Failed to log in"})
    } 
})

// Admin Registration
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });

        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error registering admin:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router