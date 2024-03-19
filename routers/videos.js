const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Video } = require('../models/video');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/videos')
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const data = await Video.create({
            name: req.body.name,
            video: req.file.filename,
            course: req.body.course
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
        const data = await Video.find()
        .populate('course')
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
router.get('/get/by-category',  async (req, res) => {
    try {
        const data = await Video.find(req.query)
        .populate('course')
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
    await Video.deleteOne({_id: req.params.id})
    res.json({
        status: true , message: "O'chirildi"
    })
})


module.exports = router
