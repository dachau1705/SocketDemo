const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantityOfProduct: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return Orders
}