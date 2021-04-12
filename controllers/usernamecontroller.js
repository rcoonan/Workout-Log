const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const {UsernameModel} = require("../models");

router.post("/register", async(req,res)=>{

    let {username, passwordhash} = req.body.user;
    try{
        const Username = await UsernameModel.create({
            username,
            passwordhash
        });


    res.status(201).json({
        message: "user succesfully registered",
        username: username
    });
} catch(err){
    if (err instanceof UniqueConstraintError){
        res.status(409).json({
            message:"Username already in use",
        });
    } else{
    res.status(500).json({
        message:"failed to register user",
    });
}
}
});

router.post("/login", async(req,res)=>{
    let {username, passwordhash} = req.body.username;

    try{
    let loginUsername = await UsernameModel.findOne({
        where:{
            username:username
        },
    });
    if(loginUsername){
    

    res.status(200).json({
        username: loginUsername,
        message:"User successfully logged in"
    });
}else{
    res.status(401).json({
        message:"Login Failed"
    });
}
}catch(error){
    res.status(500).json({
        message:"Failed to login user"
    })
}
});

module.exports = router;