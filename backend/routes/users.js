const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); 

  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  } 

  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({ email: "User already exists"}); 
    } else {
      const name = req.body.name;
      const email = req.body.email; 
      const password = req.body.password;
      const neighborhood = req.body.neighborhood;
      const zipcode = Number(req.body.zipcode);

      console.log("Creating new user");
      const newUser = new User({
        name,
        email,
        password,
        neighborhood,
        zipcode
      });

      // Hash password before saving. The salt is automatically part
      // of the hash so no need to save it separately 

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(() => res.json('User created'))
            .catch(err => res.status(400).json('Error: '+err));
        });
       });
   }});
});

router.route('/login').post((req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password; 

  User.findOne({email}).then(user => {
    if (!user) {
      res.status(404).json({ emailnotfound: "Email not found"});
    }

    // Check password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // Create JWT Payload
          const payload = {
            id: user.id,
	    name: user.name
          };

          // Sign token
          jwt.sign(
	    payload,
	    process.env.PASSPORT_SECRET,
	    {
	      expiresIn: 604800 // 1 week 
	    },
	    (err, token) => {
	      res.json({
		success: true,
		token: "Bearer "+token
	      });
	    }
	  );
        } else {
	  return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
     });
  });
});
	    
module.exports = router; 

