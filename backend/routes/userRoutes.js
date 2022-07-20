const router = require('express').Router();
const User = require('../models/User');

//creating user
router.post('/', async(req, res) => {
    try{
        const {name, email, password, picture} = req.body;
        const user = await User.create({name, email, password, picture});
        res.status(201).json(user);
    }catch(err){
        let message;
        if(err.code == 11000){
            message = "User already exists";
        }else{
            message = err.message;
        }
        console.log(err);
        res.status(400).json(message);
    }
});

//login user
router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        user.status = 'online'
        const save = await user.save();
        // console.log(save);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err.message);
    }
})

module.exports = router;