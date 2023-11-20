const express = require('express');
const router = express.Router();
const {Types} = require("../models");

router.get("/", async (req,res) => {
    const listOfType = await Types.findAll();
    res.json(listOfType);
});
router.get("/byId/:id", async (req,res) => {
    const id = req.params.id;
    const post = await Types.findByPk(id);
    res.json(post)
});
router.post("/", async (req,res) => {
    const type = req.body;
    await Types.create(type);
    res.json(type);
});

module.exports = router;