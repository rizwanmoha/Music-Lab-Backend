require("dotenv").config();

const request = require("supertest");



beforeEach(async () => {
  app = require('../../app')
})

// 


describe("GET /api/v1/teacher/lsitofteachersrequest", () => {
  it("Should Return a List of Unapproved Teachers", async () => {
    const response = await request(app).get("/api/v1/teacher/lsitofteachersrequest");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "List of all Teachers Accept request");
    expect(response.body).toHaveProperty("teachers");

  });

});

describe("GET /api/v1/teacher/getTeacher/{id}", () => {
    it("Should Return Teacher Info", async () => {
      const response = await request(app).get("/api/v1/teacher/getTeacher/66313cd8f8f7ab798d27733f");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "teacher details");
        expect(response.body).toHaveProperty("teacher");
    });
  
  });
