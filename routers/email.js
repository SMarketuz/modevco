const express = require('express');
const router = express.Router();
const { Email } = require('../models/email');
const auth = require('../middleware/token');



router.post('/new',auth, async (req, res) => {
    try {
        const data = await Email.create({
            email: req.body.email,
            userId: req.user
        })
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        const data = await Email.find()
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
        await Email.deleteOne({_id: req.params.id})
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

