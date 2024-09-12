const express = require('express');
const router = express.Router();
const Model = require('./lettersModel.js');

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const delLetter = await Model.deleteLetter(id);
    res.status(200).json(delLetter);
});


module.exports = router;
