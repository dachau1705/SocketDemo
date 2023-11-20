const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        productname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productdescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unitsInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exterior: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    

    Products.associate = (models) =>{
        Products.hasMany(models.Orders, {
            foreignKey: 'productID',
        })
    }
    return Products
}