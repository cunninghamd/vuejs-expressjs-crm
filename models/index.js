var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var config    = require(__dirname + '/../config/config.json');
var db        = {};

// override database parameters with environment variables (RDS or local), if available
config.database.username = process.env.RDS_USERNAME || process.env.DB_USER || config.database.username;
config.database.password = process.env.RDS_PASSWORD || process.env.DB_PASS || config.database.password;
config.database.database = process.env.RDS_DB_NAME || process.env.DB_DATABASE || config.database.database;
config.database.host = process.env.RDS_HOSTNAME || process.env.DB_HOST || config.database.host;
config.database.dialect = process.env.DB_DIALECT || config.database.dialect;

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file.indexOf('_') !== 0);
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
