const express = require('express');
const router = express.Router();
const { Products } = require("../models");

router.get("/", async (req, res) => {
    const listOfProduct = await Products.findAll();
    res.json(listOfProduct);
});
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Products.findByPk(id);
    res.json(product)
});
router.get("/byTypeID/:typeid", async (req, res) => {
    const typeID = req.params.typeid;
    const products = await Products.findAll({ where: { idType: typeID } });
    res.json(products)
});
router.get("/top8", async (req, res) => {
    const products = await Products.findAll({
        order: [['productname', 'ASC']],
        limit: 8,
    })
    res.json(products)
});
router.post("/", async (req, res) => {
    const product = req.body;
    await Products.create(product);
    res.json(product);
});
router.get("/count", async (req, res) => {
    try {
        const productCount = await Products.count();
        res.json({ count: productCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi đếm số lượng sản phẩm." });
    }
});
module.exports = router;