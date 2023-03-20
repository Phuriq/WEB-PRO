const express = require('express')
const router = express.Router()

const article = require('../article-db.json')

router.get('/', function (req, res, next) {
    var data = { article: article, title: 'Express' }
    res.render('index', data)
})

// router.get('/blogapi/:id', (req, res) => {
//     res.json(article.find(article => article.id === req.params.id))
// })

module.exports = router