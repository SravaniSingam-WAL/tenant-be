'use strict'
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        'UserRole',
        {
            userId: DataTypes.INTEGER,
            roleId: DataTypes.INTEGER
         },
        {
            defaultScope: {
                order: null
            },
            tableName: 'UserRole',
            timestamps: false
        }
    )
    UserRole.associate = function (models) {
        UserRole.belongsTo(models.Role, {
            foreignKey: 'roleId',
            targetKey: 'id',
            as: 'roles',
        });
     }
    return UserRole
}
