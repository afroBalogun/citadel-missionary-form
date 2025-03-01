const Department = require("./department.model");

const postDepartment = async (req, res) => {
    try {
        const newDepartment = await Department(req.body);
        const submitDepartment = await newDepartment.save();

        res.status(201).json({ message: "Department submitted successfully", data: submitDepartment });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error submiting Department", error });
    }
}

const getAllDepartment = async (req, res) => {
    try {
        const department = await Department.find().sort({ createdAt: -1})
        res.status(200).json(department)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching the Department", error})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.status(200).json({ message: "Department deleted successfully", data: deletedDepartment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting the Department", error });
    }
};



module.exports = {
    postDepartment,
    getAllDepartment,
    deleteDepartment
}