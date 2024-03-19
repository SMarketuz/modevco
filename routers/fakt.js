const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Fakt } = require('../models/fakt');

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
        const data = await Fakt.create({
            video: req.file.filename,
            name: req.body.name,
        })
        res.json(data) 
    } catch (err) { 
        res.status(500).json({
            message: "Serverda muammo mavjud" 
        })
    } 
})
router.get('/get', async (req, res) => {
    try { 
        const data = await Fakt.find()
        res.json(data) 
    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
})
router.get('/get/byID/:id', async (req, res) => {
    try { 
        const data = await Fakt.findById(req.params.id)
        res.json(data) 
    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
})
module.exports = router