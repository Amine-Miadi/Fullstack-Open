const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')




beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('all blogs are returned as JSON', () => {
    test('checking number of blogs', async () => {
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length)
    })
    test('checking the blogs are in JSON format', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('content-type',/application\/json/)
    })
    test('checking if the blogs have property id instead of _id', async () => {
        const result = await helper.blogsInDb()
        result.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    })
})



describe('successful post request operation', () => {
    test('verifying that a blog is added with the correct content to the DB', async () => {
        await api
        .post('/api/blogs')
        .send(helper.testBlog)
        .expect(201)

        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length + 1)

        const IDs = response.map(blog => blog.id)
        expect(IDs).toContain(helper.testBlog._id)
    })
})

describe('verifying that if likes property is missing, default to 0', () => {
    test('0 likes', async () => {
        const response = await api
        .post('/api/blogs')
        .send(helper.testBlog)
        .expect(201)

        expect(response.body.likes).toBe(0)
    })
})

describe('verifying that if url and title are both present', () => {
    test('no title', async () => {
        const blog = {
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }
        const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
    })
    test('no url', async () => {
        const blog = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)
    })
})
describe('Deleteting a blog', () => {
    test('Blog deleted successfully ', async () => {
        const response = await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(204)
    })
    test('number of blogs updated', async () => {
        await api.delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length - 1)
    })
})
describe('updating likes in a blog', () => {
    test('Blog updated successfully', async () => {
        await api
        .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .send({likes: 7})
        .expect(200)
    })

    test('update persists in database', async () => {
        await api
        .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .send({likes: 7})
        const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        expect(response.body.likes).toBe(7)
    })
})



afterAll(() => {
    mongoose.connection.close()
})