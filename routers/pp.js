

const express = require('express');
const router = express.Router();
const { Contact } = require('../models/contact');
const auth = require('../middleware/token');


router.get('/get', async (req, res) => {
   res.send('salom')
})

module.exports = router

