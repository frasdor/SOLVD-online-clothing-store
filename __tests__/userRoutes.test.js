const request = require("supertest");
const express = require("express");

// mock verifyJWT
jest.mock("../src/auth/jwt", () => ({
  verifyJWT: jest.fn(),
}));

const { verifyJWT } = require("../src/auth/jwt");
const userRoutes = require("../src/routes/userRoutes");

const app = express();
app.use(userRoutes);

describe("GET /user/profile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns 401 if no token is provided", async () => {
    const res = await request(app).get("/user/profile");

    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Missing token");
  });

  test("returns 200 and user payload if token is valid", async () => {
    const fakePayload = { id: 123, email: "test@example.com" };
    verifyJWT.mockReturnValueOnce(fakePayload);

    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", "Bearer faketoken");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Protected data",
      user: fakePayload,
    });
    expect(verifyJWT).toHaveBeenCalledWith("faketoken");
  });

  test("returns 401 if token is invalid", async () => {
    verifyJWT.mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });

    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", "Bearer badtoken");

    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Invalid token");
  });
});
