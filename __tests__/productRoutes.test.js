const request = require("supertest");
const app = require("../src/app");
const client = require("../src/db/client");

jest.mock("../src/db/client", () => ({
  query: jest.fn(),
}));

describe("Product routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/products returns all products", async () => {
    client.query.mockResolvedValueOnce({ rows: [{ id: 1, name: "Shirt" }] });

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "Shirt" }]);
  });

  test("GET /api/products returns 500 on DB error", async () => {
    client.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(500);
  });
});
