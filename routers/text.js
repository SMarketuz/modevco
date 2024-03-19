const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Tex } = require('../models/tex');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/create', upload.single('file'), async (req, res) => {
    try {
        const tex = await Tex.create({
            image: req.file.filename,
            url: req.body.url
        })
        res.json(tex)

    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
})
router.get('/get',  async (req, res) => {
    try {
        const data = await Tex.find()
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


module.exports = router
