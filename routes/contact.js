var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("contact", {
        title: "Vue.js/Express.js Customer Relationship Management (CRM)",
        contact: true,
    });
});

module.exports = router;
