'use strict'
module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define(
        'Tenant',
        {
            userId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            stripePublicKey: DataTypes.STRING,
            stripeSecretKey: DataTypes.STRING,
            webUrl: DataTypes.STRING
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
