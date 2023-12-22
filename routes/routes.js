const express = require('express');

const router = express.Router();

module.exports = router;

const Model = require('../models/model');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
    	const dataToSave = await data.save();
    	res.status(200);
    	res.json(dataToSave);
    }
    catch (error) {
    	res.status(500);
    	res.json({message: error.message});
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	}
	catch (error) {
		res.status(500);
		res.json({message: error.message});
	}
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
	try {
		const data = await Model.findById(req.params.id);
		res.json(data);
	}
	catch (error) {
		res.status(500);
		res.json({message: error.message});
	}
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const newData = req.body;

		const result = await Model.findByIdAndUpdate(id, newData);

		//const updatedData = await Model.findById(id);
		res.status(200).json({message: "Updated successfully!"});
	}
	catch (error) {
		res.status(400);
		res.json({message: error.message});
	}
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {

    try {
    	const id = req.params.id;
    	const result = await Model.findByIdAndDelete(id);
    	res.status(200).json({message: `Deleted ${result.name} successfully.`})
    }

    catch(error) {
    	res.status(500).json({message: error.message});
    }
});