var express = require('express');
var router = express.Router();
const {checkBody} = require('../modules/checkBody')
const fetch = require('node-fetch');
const User = require('../models/users');

router.post('/signup', (req,res) => {
    const { email, password, name } = req.body
    
    if(!checkBody(req.body, ['email', 'password', 'name'])) {
      return  res.json({result:   false, error: 'Missing or empty fields'})
    } 
     User.findOne({ email : email})
     .then(data => {
        if(data){
        return res.json({ result : false, error: 'User already exists'})
        } else {
        const newUser  = new User({
            name : name,
            email : email,
            password : password
        })
        newUser.save()
            .then(() => res.json({ result : true}))
        }
    })
})


router.post('/signin', (req,res) => {
    const { email, password} = req.body
    if(!checkBody(req.body, ['email', 'password'])) {
       return  res.json({result:   false, error: 'Missing or empty fields'})
    }
    User.findOne({email})
    .then(data => {
        if(data && data.password === password) {
          return  res.json({ result : true})       
        } else {           
          return  res.json({ result : false, error: 'User not found'})
        }
    })
})

module.exports = router