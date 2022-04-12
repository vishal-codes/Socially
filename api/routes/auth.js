const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//REGISTER 
router.post("/register", async(req, res) => {
    try{
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User ({ 
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });    

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        return res.json(err);
    }
});

//LOGIN
router.post("/login", async(req,res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(400).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    }catch (err){
        res.status(200).json(err);
    }
});

module.exports = router;
