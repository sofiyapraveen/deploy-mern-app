const { ensureAuthenticated } = require('../Middlewares/auth');

const router = require('express').Router(); // 👈 small 'r' use karo

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('----loggedin user detail---',req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:15000
        },
        {
            name:"tv",
            price:30000
        },
    ])
})

module.exports = router;
