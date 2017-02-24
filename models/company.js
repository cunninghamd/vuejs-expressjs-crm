module.exports = function(sequelize, DataTypes) {
    var company = sequelize.define("company", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        // company details
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        postalCode: {
            type: DataTypes.STRING,
            field: "postal_code",
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
        },
        fax: {
            type: DataTypes.STRING,
        },
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        classMethods: {
            associate: function(models) {
                company.hasMany(models.employee, { foreignKey: "company_id" })
            }
        }
    });
    
    return company;
};
