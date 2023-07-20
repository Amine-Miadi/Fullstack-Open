const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const logger = require('../utils/logger')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]
const testBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('all blogs are returned as JSON', () => {
    test('checking number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    test('checking the blogs are in JSON format', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('content-type',/application\/json/)
    })
    test('checking if the blogs have property id instead of _id', async () => {
        const result = await api.get('/api/blogs')
        result.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    })
})



describe('successful post request operation', () => {
    test('verifying that a blog is added with the correct content to the DB', async () => {
        await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)

        const IDs = response.body.map(blog => blog.id)
        expect(IDs).toContain(testBlog._id)
    })
})

describe('verifying that if likes property is missing, default to 0', () => {
    test('0 likes', async () => {
        const response = await api
        .post('/api/blogs')
        .send(testBlog)
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
    test('no title', async () => {
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
        .delete('/api/blogs/5a422ba71b54a676234d17fb')
        .expect(204)
    })
    test('number of blogs updated', async () => {
        await api.delete('/api/blogs/5a422ba71b54a676234d17fb')
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length - 1)
    })
})
describe('updating likes in a blog', () => {
    test('Blog updated successfully', async () => {
        await api
        .put('/api/blogs/5a422bc61b54a676234d17fc')
        .send({likes: 7})
        .expect(200)
    })

    test('update persists in database', async () => {
        await api
        .put('/api/blogs/5a422bc61b54a676234d17fc')
        .send({likes: 7})
        const response = await api.get('/api/blogs/5a422bc61b54a676234d17fc')
        expect(response.body.likes).toBe(7)
    })
})




afterAll(() => {
    mongoose.connection.close()
})