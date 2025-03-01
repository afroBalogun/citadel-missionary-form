const express = require("express")
const router = express.Router()
const { postDepartment, getAllDepartment, deleteDepartment} = require('./department.controller')

router.post('/add-department', postDepartment);

router.get('/', getAllDepartment);

router.delete('/remove-department/:id', deleteDepartment);

module.exports = router;

