const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



usersRouter.post('/', async (request,response,next)=>{
    const {name,username,password} = request.body;
    if(username === '' || username === undefined || username.length < 3){
        response.status(403).json({
            message: 'must provide username, with more than 3 character'
        })
        return
    }
    if(password === '' || password === undefined || password.length < 3){
        response.status(403).json({
            message: 'must provide password, with more than 3 character'
        })
        return
    }

    const user = await User.find({username: username})
    if(user.length !== 0){
        response.status(403).json({
            message: 'username already exists'
        })
        return
    }

    const saltRounds = 10;
    const passwordhash = await bcrypt.hash(password, saltRounds);
    const userInfo = new User({
        name: name,
        username: username,
        password: passwordhash
    })
    const saveduser = await userInfo.save()
    response.status(201).json(saveduser)
})

usersRouter.get('/',async (request,response,next)=>{
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter;