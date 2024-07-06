require("dotenv").config();
const request = require("supertest");


beforeAll(async () => {
});

beforeEach(async () => {
  app = require('../../app')
})
// 

describe("Course API Tests",  () => {
// test("Fetch Course Description Correctly", async () => {
 

//   const response = await request(app).get("/api/course/description/66313dac6d904b76d979d78d");
  
//   expect(response.status).toBe(200);
//   expect(response.body).toHaveProperty("success", true);
//   expect(response.body).toHaveProperty("message", "Course fetched successfully");
//   expect(response.body).toHaveProperty("course");
//   expect(response.body.course).toHaveProperty("title");

// },50000);

test("Fetch Course Info Correctly", async () => {
 
  const response = await request(app).get("/api/course/66313dac6d904b76d979d78d");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("success", true);
  expect(response.body).toHaveProperty("message", "Course fetched successfully");
  expect(response.body).toHaveProperty("course")

},50000);

test("Fetch Wrong Course Info ", async () => {
 
  const response = await request(app).get("/api/course/66313dac6d101c76d976d72e");
  expect(response.status).toBe(404);

},50000);

test("Get Cloudinary Signature", async () => {
  const garbage = await request(app).get("/api/course/get-signature")
  expect(garbage.status).toBe(200)
  expect(garbage.body).toHaveProperty("signature")
},50000);

})


describe("Comments API Test", ()=>{

  test("Fetch Course Comments Correctly", async () => {
 

    const response = await request(app).post("/api/course/get-comments").send({
      courseId: "66313dac6d904b76d979d78d"
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "Comments fetched successfully");
    expect(response.body).toHaveProperty("comments");

  
  },50000);

  test("Fetch Wrong Course Comments", async () => {

    const response = await request(app).post("/api/course/get-comments/66313dac6d124b76d979d78d");
    expect(response.status).toBe(404);

  },50000);
  
  test("Post a Course Comments", async () => {

    const response = await request(app).post("/api/course/add-comment").send({
      courseId: "66313dac6d904b76d979d78d",
      comment: "This is a test comment",
      userId: "66313c2e1d6b02196b676a12"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    

  },50000);

  test("Course not Found", async () => {

    const response = await request(app).post("/api/course/add-comment").send({
      courseId: "66313dec1d900v90d919d78d",
      comment: "This is a test comment",
      userId: "66313c2e1d6b02196b676a12"
    });

    expect(response.status).toBe(500);
    

  },50000);

})

describe("Ratings API Test", ()=>{

  test("Fetch Rating Correctly", async () => {
 

    const response = await request(app).get("/api/course/getCourseRating/66313dac6d904b76d979d78d")
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("ratings");
    expect(response.body.ratings).toHaveProperty("count");

  
  },50000);

})


