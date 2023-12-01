const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


loginRouter.post('/', async (request,response,next) =>{
    try{
        const {username,password} = request.body;
        const user = await User.findOne({username: username})
        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)
        if(!(user && passwordCorrect)){
            response.status(401).json({
                error: 'invalid credentials'
            })
        }
        const userForToken = {
            username: user.username,
            id: user.id
        }
        const token = jwt.sign(userForToken,config.SECRET)
        response.status(201).send({
            token,
            username: user.username,
            name: user.name
        })
    }catch(err){
        console.log(err)
    }
    
})

module.exports = loginRouter