// ดึงข้อมูล json มาเก็บไว้ในตัวแปร
const express = require('express')
const router = express.Router()

const article = require('../article-db')

// กำหนดให้ path blogapi แสดงข้อมูลบทความทั้งหมดในรูปแบบ json

router.get('/', (req, res) => {
    var data = {
        title: "My blog",
        article:  article
    }
  res.render('index',data)
})

// กำหนดให้ path blogapi/id แสดงข้อมูลบทความตาม id ที่กำหนด





module.exports = router