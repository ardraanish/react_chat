const express = require('express');
const router = express.Router();
const {signin,signup,getAllUser,getLoggedInUser,refreshToken,searchUser} = require('../controller/userController')
const User = require('../model/userModel');
const { authenticate } = require('../middleWare/authenticate');

router.post("/signup", signup);


router.post('/signin', signin);


router.get("/users",authenticate, getAllUser);

router.post('/refresh-token', refreshToken);

router.get('/me',authenticate,getLoggedInUser,  );


module.exports = router;


