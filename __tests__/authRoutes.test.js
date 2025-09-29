const request = require("supertest");
const app = require("../src/app");

// Mocky
jest.mock("../src/db/client", () => ({
  query: jest.fn(),
}));
const client = require("../src/db/client");

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
const bcrypt = require("bcrypt");

jest.mock("../src/auth/jwt", () => ({
  createJWT: jest.fn(() => "fake-token"),
}));
const { createJWT } = require("../src/auth/jwt");

describe("Auth routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/register returns 201 and token", async () => {
    client.query.mockResolvedValueOnce({
      rows: [{ id: 1, name: "John", email: "john@example.com", created_at: new Date() }],
    });
    bcrypt.hash.mockResolvedValueOnce("hashed-password");

    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "John", email: "john@example.com", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBe("fake-token");
    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
  });

  test("POST /api/auth/register returns 400 if email exists", async () => {
    client.query.mockRejectedValueOnce({ code: "23505" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "John", email: "john@example.com", password: "123456" });

    expect(res.statusCode).toBe(400);
  });

  test("POST /api/auth/login returns 200 and token for correct credentials", async () => {
    client.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: "john@example.com", password: "hashed-password" }],
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe("fake-token");
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed-password");
  });

  test("POST /api/auth/login returns 401 for invalid user", async () => {
    client.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "unknown@example.com", password: "123456" });

    expect(res.statusCode).toBe(401);
  });

  test("POST /api/auth/login returns 401 for wrong password", async () => {
    client.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: "john@example.com", password: "hashed-password" }],
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });
});
