const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})
  
blogsRouter.post('/', async (request, response, next) => {
  if('likes' in request.body === false){
    request.body.likes = 0
  }else if(('title' in request.body === false) || ('url' in request.body === false)){
    response.status(400).send("Bad request")
  }else{
    const decoded = jwt.verify(request.token, config.SECRET);
    if(!decoded.id){
      return response.status(401).json({error: 'invalid token'})
    }
    const user = await User.findById(decoded.id)
    const blog = new Blog(request.body)
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.json(result)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  blog.likes =  request.body.likes
  await blog.save()
  response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request,response,next) => {
  const id = request.params.id
  const decoded = jwt.verify(request.token, config.SECRET);
  if(!decoded.id){
    return response.status(401).json({error: 'invalid token'})
  }
  const blog = await Blog.findById(id)
  if(blog === null){
    return response.status(404).json({error: 'blog does not exist'})
  }
  if(blog.user.toString() !== decoded.id.toString()){
    return response.status(403).json({error: 'Unothorized operation'})
  }
  await Blog.deleteOne({_id: id})
  response.status(201).json({
    message: 'blog deleted successfully'
  })
})

module.exports = blogsRouter