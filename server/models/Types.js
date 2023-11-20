const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define("Types", {
        nameOfType: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Types.associate = (models) =>{
        Types.hasMany(models.Products, {
            foreignKey: 'idType',
        })
    }
    return Types
}