const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Roles.associate = (models) =>{
        Roles.hasMany(models.Users, {
            foreignKey: 'role',
        })
    }
    return Roles
}