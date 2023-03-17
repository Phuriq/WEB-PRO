const express = require('express')
const router = express.Router()

const article = require('../article-db')

router.get('/', function(req, res, next) {
    var data = { 
    title: 'Express', 
    user: {name: 'Byndit', lname: 'Thanasopon'},

}
    res.render('index', data)
})

module.exports = router