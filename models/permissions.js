'use strict'
module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define(
        'Permissions',
        {
            userId: DataTypes.INTEGER,
            applicationId: DataTypes.INTEGER,
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
        Permissions.belongsTo(models.Application, {
            foreignKey: 'applicationId',
            targetKey: 'id',
            as: 'application',
        });}
    return Permissions
}
