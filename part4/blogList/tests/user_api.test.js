const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const mongoose = require('mongoose')



describe('User registration tests', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialAccounts)
    })

    test('number of users updated', async () => {
        const testUser = new User({
            name : "admin5",
            username : "admin5",
            password : "pass5"
        })
        const accountsBefore = await helper.usersInDB()
        const user = await testUser.save()
        const accountsAfter = await helper.usersInDB()
        expect(accountsAfter.length).toBe(accountsBefore.length + 1);
    });

    test('no username', async () => {
        const testUser = {
            name : "admin5",
            password : "pass5"
        }
        const response = await api
        .post('/api/users')
        .send(testUser)
        .expect(403)

        expect(response.body.message).toBe("must provide username, with more than 3 character")
    })
    test('no password', async () => {
        const testUser = {
            name : "admin5",
            username : "admin5"
        }
        const response = await api
        .post('/api/users')
        .send(testUser)
        .expect(403)

        expect(response.body.message).toBe("must provide password, with more than 3 character")
    })
    test('short username', async () => {
        const testUser = {
            name : "admin5",
            username : "ad",
            password: "pass6"
        }
        const response = await api
        .post('/api/users')
        .send(testUser)
        .expect(403)

        expect(response.body.message).toBe("must provide username, with more than 3 character")
    })
    test('short password', async () => {
        const testUser = {
            name : "admin5",
            username : "admin5",
            password: "pa"
        }
        const response = await api
        .post('/api/users')
        .send(testUser)
        .expect(403)

        expect(response.body.message).toBe("must provide password, with more than 3 character")
    })
    test('user exists already', async () => {
        const testUser = {
            name : "admin5",
            username : "admin5",
            password: "pass5"
        }
        
        await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

        const response = await api
        .post('/api/users')
        .send(testUser)
        .expect(403)

        expect(response.body.message).toBe("username already exists")
    })
});



afterAll(() => {
    mongoose.connection.close()
})