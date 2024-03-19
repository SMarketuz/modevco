const express = require('express');
const router = express.Router();
const { Contact } = require('../models/contact');
const auth = require('../middleware/token');



router.post('/new',auth, async (req, res) => {
    try {
        const {name , theme , message} = req.body
        if(!name || !theme || !message)
            return res.status(400).json({
                status: false,
                message: "Ma'lumot to'liq emas"
            })
        await Contact.create({
            name,
            theme,
            message,
            userId: req.user
        })
        res.json({
            status: true,
            message: "Murojat yuborildi"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})

router.get('/get', async (req, res) => {
    try {
        const data = await Contact.find()
            .populate('userId', '-password')
    
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})

router.post('/delete/:id',  async (req, res) => {
    try {
        await Contact.deleteOne({_id: req.params.id})
        res.json({
            status: true,
            message: "Ma'lumot o'chirildi"
        })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})
module.exports = router

