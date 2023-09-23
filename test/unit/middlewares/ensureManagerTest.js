import { expect } from "chai";
import sinon from "sinon";
import { ensureManager } from "../../../src/middlewares/ensureManager";
import { User } from "../../../src/models/User";

describe("ensureManager", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should call next() if the user is a manager", async () => {
    const req = { user_id: "valid_user_id" };
    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };

    sandbox.stub(User, "findById").resolves({ isManager: true });

    const next = sandbox.stub();

    await ensureManager(req, res, next);

    expect(next.calledOnce).to.be.true;
  });

  it("should return a 401 error if the user is not a manager", async () => {
    const req = { user_id: "valid_user_id" };
    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };

    sandbox.stub(User, "findById").resolves({ isManager: false });

    const next = sandbox.stub();

    await ensureManager(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(
      res.json.calledWith({
        status: "error",
        message: "User isn't admin.",
      })
    ).to.be.true;
    expect(next.called).to.be.false;
  });
});
