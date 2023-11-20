const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define("OrderDetails", {
        OrderDetailStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        receiveDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    OrderDetails.associate = (models) =>{
        OrderDetails.hasMany(models.Orders, {
            foreignKey: 'orderDetailID',

        })
    }
    return OrderDetails
}