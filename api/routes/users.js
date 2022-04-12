const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//update user
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.json(err);
            }
        }
        try{
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, 
            });
            res.status(200).json("account has been updated");
        }catch(err){
            return res.json(err);
        }
    }else {
        return res.status(403).json("You cannot update other users account!");
    }
});

//delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been delted successfully!");
        }catch(err){
            return res.json(err);
        }
    }else {
        return res.status(403).json("You cannot delete other users account!");
    }
});

//get a user
router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({username: username});
        const {password, updatedAt,...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all user's
router.get("/all", async(req, res) => {
    try{
        const filter = {};
        const allUsers = await User.find(filter);

        let allUsersList = [];
        for (const { _id, name, username, profilePicture, description, city, from, relationship } of allUsers){
            allUsersList.push({ _id, name, username, profilePicture, description, city, from, relationship })
        }
        res.status(200).json(allUsersList);
    }catch(err){
        res.status(500).json(err);
    }   
});

//get followings of a particular user
router.get("/followings/:userId", async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const followings = await Promise.all(
            user.following.map(followingId => {
                return User.findById(followingId)
            })
        );
        let followingsList = [];
        followings.map(following => {
            const {_id, username, profilePicture, name} = following;
            followingsList.push({ _id, username, profilePicture, name });
        });
        res.status(200).json(followingsList);
    }catch(error) {
        console.log(error);
    }
});

//follow a user
router.put("/:id/follow", async(req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: { followers: req.body.userId }});
                await currentUser.updateOne({$push: { following: req.params.id }});
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("You already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself");
    }
});

//unfollow a user
router.put("/:id/unfollow", async(req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: { followers: req.body.userId }});
                await currentUser.updateOne({$pull: { following: req.params.id }});
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("You were not following this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself");
    }
});

module.exports = router;
