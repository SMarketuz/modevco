const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Future } = require('../models/future');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

router.post('/new', upload.single('file'), async (req, res) => {
    try {
        const data = await Future.create({
            image: req.file.filename,
            direct: req.body.direct,
            production: req.body.production,
            title: req.body.title
        })
        res.json(data) 

    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
})
router.get('/get',  async (req, res) => {
    try {
        const data = await Future.find()
        res.json({
            status: true,
            data
        })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})
router.post('/delete/:id',  async (req, res) => {
    await Future.deleteOne({_id: req.params.id})
    res.json({
        status: true , message: "O'chirildi"
    })
})


router.get('/',  async (req, res) => {
    const data = await Future.find(req.query)
    res.send(data)
})
module.exports = router
