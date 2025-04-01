const app = require("../index");
const request = require("supertest");

const baseAPI = '/api'

describe("User's routes", () => {
    beforeEach(async () => {
        const registerResp = await request(app).post(`${baseAPI}/users/register`).send({
            name: 'Test User',
            email: 'admin@gmail.com',
            password: '123456',
            role: 'admin'
        })

        const loginResp = await request(app)
            .post(`${baseAPI}/users/login`)
            .send({
                email: 'admin@gmail.com',
                password: '123456'
            })

        const getAllResp = await request(app)
            .get(`${baseAPI}/users/get-all`)
            .set('Authorization', `Bearer ${loginResp.body.token}`);
        
        const users = getAllResp.body.users
        console.log(users)

        users.forEach(async(user) => {
            await request(app).delete(`${baseAPI}/users/delete/${user._id}`);
        });

    })

    describe("POST /register", () => {
        test("should register a new user", async () => {
            const response = await request(app).post(`${baseAPI}/users/register`).send({
                name: 'Test User',
                email: 'na@gmail.com',
                password: '123456',
                role: 'admin'
            })
            expect(response.status).toBe(201);
        })
    })
})