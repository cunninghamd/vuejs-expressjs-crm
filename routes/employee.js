var express = require('express');
var router = express.Router();
var models = require("../models");

router.get("/:id", function(request, response, next) {
    models.employee.findById(request.params.id).then(function(employee) {
        response.json(employee);
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

router.post("/", function(request, response, next) {
    var employee = request.body;
    
    if (employee.id !== null) {
        models.employee.findById(employee.id).then(function(oldEmployee) {
            oldEmployee.update(employee);
            response.json(employee);
        }).catch(function(errors) {
            response.status(500).send({
                message: "Whoops! Something went awry!",
                sequelizeErrors: errors,
            });
        });
    } else {
        delete employee.id; // clears id for auto-create by sequelize
        models.employee.create(employee).then(function(employee) {
            response.json(employee);
        }).catch(function(errors) {
            response.status(500).send({
                message: "Whoops! Something went awry!",
                sequelizeErrors: errors,
            });
        });
    }
});

router.delete("/:id", function(request, response, next) {
    var id = request.params.id;
    
    models.employee.destroy({ where: { id: id }}).then(function(result) {
        response.send({ result: result });
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

module.exports = router;
