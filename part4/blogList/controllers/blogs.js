const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
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
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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
  await Blog.deleteOne({_id: id})
  response.status(204).send("content deleted successfully")
})

module.exports = blogsRouter