const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/token');


router.post('/new', async (req, res) => {
    try {
        const dataUsername = await User.findOne({ username: req.body.username })
        const dataEmail = await User.findOne({ email: req.body.email })
        if (dataUsername)
            return res.status(400).json({
                status: false,
                message: "Bunday username mavjud"
            })
        if (dataEmail)
            return res.status(400).json({
                status: false,
                message: "Bunday email mavjud"
            })
        const { name, email, phone, username } = req.body;
        if(!name || !email || !phone || !username || !req.body.password)
            return res.status(400).json({
                status: false,
                message: "Ma'lumot yetarli emas"
            })
        const password = await bcrypt.hash(req.body.password , 10)
        await User.create({
            name, email, phone, username, password
        })
    
        res.status(201).json({
            status: true,
            message: "Foidalanuvchi ro'yxatdan o'tdi" 
        })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})
 
router.post('/delete/:id' , async (req , res) => {
    await User.deleteOne({_id: req.params.id})
    res.status(200).json({
        status: true,
        message: "Foidalanuvchi o'chirildi"
    })
})

router.get('/one' ,auth, async (req , res) => {
    try {
        const data = await User.findById({_id: req.user._id})
        .select({username: 1})
        res.send(data)
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Serverda muamo mavjud'
        })
    }
})

router.get('/all' , async (req , res) => {
    const data = await User.find()
    .select({password: 0})
    res.status(200).json({
        status: true,
        data 
    })
})

module.exports = router