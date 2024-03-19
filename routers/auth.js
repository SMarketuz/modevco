const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).json({
            status: false,
            message: "Ma'lumot yetarli emas"
        })

    const user = await User.findOne({ username })
    if (!user)
        return res.status(400).json({
            status: false,
            message: "Username yoki parol xato "
        })

    const passwordCom = await bcrypt.compare(password, user.password)
    if (!passwordCom)
        return res.status(400).json({
            status: false,
            message: "Username yoki parol xato "
        })
    
    const token = jwt.sign({user: user._id} , config.get('tokenKeyPrivate') , {expiresIn: '30d'})
    res.status(201).json({
        status: true,
        token
    })
})

module.exports = router