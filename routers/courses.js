const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Course } = require('../models/course');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

router.post('/new', upload.single('image'), async (req, res) => {
    const data = await Course.create({
        image: req.file.filename,
        badge: req.body.badge,
        title: req.body.title,
        learn: req.body.learn,
        information: req.body.information,
        level: req.body.level,
        fakt: req.body.fakt
    })
    res.json(data) 
    // try {
  
    // } catch (err) {
    //     res.status(500).json({
    //         message: "Serverda muammo mavjud"
    //     })
    // }
})
router.get('/get',  async (req, res) => {
    try {
        const data = await Course.find().lean()
        .populate('fakt')
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
router.get('/category',  async (req, res) => {
    try {
        const data = await Course.find(req.query)
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
    await Course.deleteOne({_id: req.params.id})
    res.json({
        status: true , message: "O'chirildi"
    })
})


module.exports = router
