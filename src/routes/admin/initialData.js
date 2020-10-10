const express = require('express');
const { initailData } = require('../../controller/admin/initailData');
const router = express.Router();

router.post('/initialdata', initailData)


// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

module.exports = router;