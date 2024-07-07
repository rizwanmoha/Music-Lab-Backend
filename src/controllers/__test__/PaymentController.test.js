require("dotenv").config();
const request = require("supertest");

beforeEach(async () => {
  app = require('../../app')
})

describe("POST /api/create-order", () => {
  it("Should Return a Razorpay Order", async () => {
    const response = await request(app).post("/api/create-order").send({
      amount: "100000",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("entity");
    expect(response.body).toHaveProperty("amount");
    expect(response.body).toHaveProperty("currency");
    expect(response.body).toHaveProperty("status","created");
  });

  it("should update a product", async () => {
    const response = await request(app).post("/api/create-order")
      
    expect(response.status).toBe(500);
  });

  it("should update a product", async () => {
    const response = await request(app).post("/api/create-order")
      
    expect(response.status).toBe(500);
  });
});

