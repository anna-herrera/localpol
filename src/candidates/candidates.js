// candidates.js - candidates route module

var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res) {
    res.render('candidate_pages/index');
});

// About page route
router.get('/login', function(req, res) {
    res.render('candidate_pages/login');
});

router.get('/success', function(req, res) {
    res.render('candidate_pages/success');
})

module.exports = router;