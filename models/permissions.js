'use strict'
module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define(
        'Permissions',
        {
            appName: DataTypes.STRING,
            tenantId: DataTypes.INTEGER,
            isAccess: DataTypes.BOOLEAN
        },
        {
            defaultScope: {
                order: null
            },
            tableName: 'Permissions',
            timestamps: false
        }
    )
    Permissions.associate = function (models) {
    }
    return Permissions
}
