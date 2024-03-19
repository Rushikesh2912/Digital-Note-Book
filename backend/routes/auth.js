const express = require('express');
const bcrypt = require('bcryptjs');     //for protection our password
var jwt = require('jsonwebtoken');   //for verfiy the user and send token by JWT
const Users = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middlware/fetchuser');

//when user change something in verfying token then JWT_SECRET check that
var JWT_SECRET = 'RUshikesh$db';


// Route 1 : create a users data to post - "api/auth/createuser"  no login
router.post('/createuser', [
  // Validate and sanitize the 'name' field
  body('name').isLength({ min: 3 }),

  // Validate and sanitize the 'email' field
  body('email').isEmail().normalizeEmail(),

  //vadiate and sanitize the 'username' field
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 Characters long'),

  // Validate and sanitize the 'password' field
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
  let success = false;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //check the user with this email exists already
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
    }

    //for password Protection using bcript and salt
    // Store hash in your password DB.
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
   
    //create a new users
    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: secPass,
    });

    //this for the show user unique id and verfiy easily 
    const data = {
      user: {
        id: user.id
      }
    }
    //share token to user 
    const token = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({success, token});

    //catch for the user not found or some error 
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});



// Route 2 : create a users data to post - "api/auth/login"  no login
router.post('/login', [
  body('username', 'Enter the Vaild username').exists(),
  body('password', 'Enter the Vaild Password').exists(),
], async (req, res) => {
  let success = false;
  //if they are an error to return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //findout the username'
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ success, error: "Incorrect Username and Password" });
    }

    //compare the username for that password bcrypt is check internally
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ success, error: "Incorrect Username and Password" });
    }
    //if password is find then show the payload of resp. user id
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken: token });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});



// Route 3 : create a users data to post - "api/auth/login"  login requried
router.post('/getuser', fetchuser, async (req, res) => {
 // Route handling logic
  try {
    userId = req.user.id;
    const user = await Users.findById(userId).select("-password -username");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
});


module.exports = router;