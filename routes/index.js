var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index", {
        title: "Vue.js/Express.js Customer Relationship Management (CRM)",
        index: true,
    });
});

module.exports = router;
