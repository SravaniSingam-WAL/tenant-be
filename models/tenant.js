'use strict'
module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define(
        'Tenant',
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            brandName: DataTypes.STRING,
            userRole: DataTypes.STRING
        },
        {
            defaultScope: {
                order: null
            },
            tableName: 'Tenant',
            timestamps: false
        }
    )
    Tenant.associate = function (models) {
    }
    return Tenant
}
