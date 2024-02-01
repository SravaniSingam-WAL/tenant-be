'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            userName: DataTypes.STRING,
            brandName: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            defaultScope: {
                order: null
            },
            tableName: 'User',
            timestamps: false
        }
    )
    User.associate = function (models) {
        User.hasMany(models.Permissions, {
            foreignKey: 'userId',
            as: 'permissions',
        });
        User.hasMany(models.UserRole, {
            foreignKey: 'userId',
        });

        User.belongsToMany(models.Application, {
            through: models.Permissions,
            foreignKey: 'userId',
            otherKey: 'applicationId',
            as: 'applications',
        });
    }
    return User
}
