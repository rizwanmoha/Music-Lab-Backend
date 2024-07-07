require("dotenv").config();

const request = require("supertest");
const app = require('../../app')


let user_token;
const user_id = "66313c2e1d6b02196b676a12"

beforeAll(async () => {
    const response = await request(app).post("/api/v1/user/login").send({
        email: "harshit@gmail.com",
        password: "Harshit1*"
    });

    user_token = response.body.token;
});

// 


describe("Get Wishlist", () => {
  it("No Token Sent", async () => {
    console.log(user_token)
    const response = await request(app).post("/api/v1/user/wishlist")

    expect(response.status).toBe(404);

  });
  
 
});

