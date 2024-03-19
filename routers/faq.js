const express = require('express');
const router = express.Router();
const { Faq } = require('../models/faq');


router.post('/new',  async (req, res) => {
    const {question , answer} = req.body
    const data = await Faq.create({
        question,
        answer
    })

    res.json({status: true , message: "Ma'lumot saqlandi"})
})
router.get('/get',  async (req, res) => {
    try {
        const data = await Faq.find()
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
    const data = await Faq.deleteOne({_id: req.params.id})
    res.json({
        status: true,
        message: "Ma'lumot o'chirildi"
    })
})

module.exports = router
