const { createJWT, verifyJWT } = require("../src/auth/jwt");

describe("JWT utils", () => {
  const payload = { id: 1, email: "test@example.com" };

  test("should create a valid JWT and verify it successfully", () => {
    const token = createJWT(payload);
    const decoded = verifyJWT(token);

    expect(decoded).toEqual(payload);
  });

  test("should throw error for tampered token", () => {
    const token = createJWT(payload);

    // replace the signature to make the token invalid
    const parts = token.split(".");
    const tamperedToken = `${parts[0]}.${parts[1]}.WRONG_SIGNATURE`;

    expect(() => verifyJWT(tamperedToken)).toThrow("Invalid token!");
  });

  test("should return correct payload", () => {
    const token = createJWT(payload);
    const decoded = verifyJWT(token);

    expect(decoded.id).toBe(1);
    expect(decoded.email).toBe("test@example.com");
  });
});
