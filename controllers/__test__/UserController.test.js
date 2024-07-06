
require("dotenv").config();

const request = require("supertest");
const { ObjectId } = require("mongodb");
const { describe, after } = require("node:test");

const userSchema = require("../../models/user.js");
const connectDb = require('../../database/db.js');
beforeAll(async () => {
});

beforeEach(async () => {
  app = require('../../app')
})

describe("Login Tests",  () => {
      test("User Login Succussfull", async () => {
       
      
        const response = await request(app).post("/api/v1/user/login").send({
          email: "charshit166@gmail.com",
          password: "Harshit1*"
        });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message", "Sign In successful");
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("token");
      
      },50000);
  
      test("User Not Exist", async () => {
       
      
        const response = await request(app).post("/api/v1/user/login").send({
          email: "askjdsadsj@gail.com",
          password: "Hshsh12*",
        });
        
        expect(response.status).toBe(404);
      
      },50000);

      test("User Password Wrong", async () => {
       
      
        const response = await request(app).post("/api/v1/user/login").send({
          email: "charshit166@gmail.com",
          password: "Harshit1ssasaas*"
        });
        
        expect(response.status).toBe(501);
      
      },50000);
      
      
      
})    

describe("Register Users", async () => {
    test("User Already Exists", async () => {
       
      const response = await request(app).post("/api/v1/user/register").send({
              firstName: "Harshit",
              lastName: "Chauhan",
              email: "harshitkz.c21@gmail.com",
              password: "MeraPassword"
          });

      expect(response.status).toBe(400);

    },50000);
})

