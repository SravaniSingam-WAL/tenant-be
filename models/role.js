'use strict'
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'Role',
        {
            name: DataTypes.STRING,
        },
        {
            defaultScope: {
                order: null
            },
            tableName: 'Role',
            timestamps: false
        }
    )
    Role.associate = function (models) {
    }
    return Role
}
