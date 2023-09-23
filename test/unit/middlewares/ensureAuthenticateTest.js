import { expect } from "chai";
import jwt from "jsonwebtoken";
import ensureAuthenticate from "../../../src/middlewares/ensureAuthenticate";

describe("ensureAuthenticate", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  describe("verifyToken", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = TestUtils.mockReq();
      res = TestUtils.mockRes();
      next = TestUtils.mockNext(sandbox);
    });

    it("should return 401 if no token is provided", async () => {
      const error = new Error("Sem token");
      error.status = 401;

      try {
        await ensureAuthenticate(req, res, next);
      } catch (err) {
        expect(err).to.deep.equal(error);
      }
    });

    it("should return 401 if token is malformed", async () => {
      req.headers.authorization = "Beaer 123456789a32";

      const error = new Error("Token inválido");
      error.status = 401;

      try {
        await ensureAuthenticate(req, res, next);
      } catch (err) {
        expect(err).to.deep.equal(error);
      }
    });

    it("should return 401 if token is expired", async () => {
      req.headers.authorization = "Bearer expiredtoken";

      sandbox
        .stub(jwt, "verify")
        .throws(new jwt.TokenExpiredError("Token expired"));

      try {
        await ensureAuthenticate(req, res, next);
      } catch (err) {
        expect(err.status).to.equal(401);
        expect(err.message).to.equal("Token expirado");
      }
    });

    it("should return 500 if an error is thrown", async () => {
      req.headers.authorization = "Bearer invalidtoken";

      sandbox.stub(jwt, "verify").throws(new Error("Token inválido"));

      try {
        await ensureAuthenticate(req, res, next);
      } catch (err) {
        expect(err.status).to.equal(500);
        expect(err.message).to.equal("Internal server error - Token inválido.");
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
