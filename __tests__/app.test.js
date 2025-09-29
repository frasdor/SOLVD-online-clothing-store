const request = require("supertest");
const app = require("../src/app");

test("GET /api/hello returns Hello World!", async () => {
  const res = await request(app).get("/api/hello");
  expect(res.statusCode).toBe(200);
  expect(res.text).toContain("Hello");
});
