module.exports = function(sequelize, DataTypes) {
    var employee = sequelize.define("employee", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        companyId: {
            type: DataTypes.UUID,
            field: "company_id",
        },
        // contact details
        firstName: {
            type: DataTypes.STRING,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING,
            field: "last_name",
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
        mobile: {
            type: DataTypes.STRING,
        },
        // hr details
        salary: {
            type: DataTypes.DOUBLE,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            field: "start_date",
        },
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        classMethods: {
            associate: function(models) {
                employee.belongsTo(models.company, {
                    foreignKey: "company_id"
                });
            },
        },
    });
    
    return employee;
};
