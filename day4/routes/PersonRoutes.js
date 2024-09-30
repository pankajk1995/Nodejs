const express = require('express');

const router = express.Router();
const Person = require('./../models/Person');
// Post method

router.post('/', async (req, res) => {
  const data = req.body; // assuming the request body contains the person data
  try {
    // create a new person documnet using the Mongoose Model
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
// get all user list 
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server erros" });
  }
});
// define work type parameter end point
router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;

    if (
      worktype == "chef" ||
      worktype == "waiter" ||
      worktype == "manager"
    ) {
      const response = await Person.find({ work: worktype });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "invalid worktype" }); // Changed status to 400 for client error
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" }); // Corrected typo in error message
  }
});

module.exports = router;
