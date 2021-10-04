const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('teams', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        budget: {
          type: DataTypes.REAL,
        },
        members: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });
};