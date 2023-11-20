const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Collections = sequelize.define("Collections", {
        nameOfCollection: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Collections.associate = (models) =>{
        Collections.hasMany(models.Products, {
            foreignKey: 'collectionID',
        })
    }
    return Collections
}