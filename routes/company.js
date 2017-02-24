var express = require('express');
var router = express.Router();
var models = require("../models");

router.get("/", function(request, response, next) {
    models.company.findAll().then(function(companies) {
        response.render("company/index", {
            title: "Vue.js/Express.js Customer Relationship Management (CRM)",
            register: true,
            companies: JSON.stringify(companies),
            component: "company",
        });
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

router.get("/list", function(request, response, next) {
    models.company.findAll().then(function(companies) {
        response.json(companies);
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

router.get("/:id", function(request, response, next) {
    models.company.findById(request.params.id).then(function(company) {
        company.getEmployees();
        
        response.json(company);
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

router.get("/:id/employees", function(request, response, next) {
    models.employee.findAll({ where: { companyId: request.params.id }}).then(function(employees) {
        response.json(employees);
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

router.post("/", function(request, response, next) {
    var company = request.body;
    
    if (company.id !== null) {
        models.company.findById(company.id).then(function(oldCompany) {
            oldCompany.update(company);
            response.json(company);
        }).catch(function(errors) {
            response.status(500).send({
                message: "Whoops! Something went awry!",
                sequelizeErrors: errors,
            });
        });
    } else {
        delete company.id; // clears id for auto-create by sequelize
        models.company.create(company).then(function(company) {
            response.json(company);
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
    
    models.employee.destroy({ where: { companyId: id }}).then(function(result) {
        response.send({ result: result });
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
    
    models.company.destroy({ where: { id: id }}).then(function(result) {
        response.send({ result: result });
    }).catch(function(errors) {
        response.status(500).send({
            message: "Whoops! Something went awry!",
            sequelizeErrors: errors,
        });
    });
});

module.exports = router;
