'use strict'
module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define(
        'Application',
        {
            name: DataTypes.STRING,
            url: DataTypes.STRING,
        },
        {
            defaultScope: {
                order: null
            },
            tableName: 'Application',
            timestamps: false
        }
    )
    Application.associate = function (models) {
        Application.hasMany(models.Permissions, {
            foreignKey: 'applicationId',
            as: 'permissions',
        });
    }
    return Application
}
