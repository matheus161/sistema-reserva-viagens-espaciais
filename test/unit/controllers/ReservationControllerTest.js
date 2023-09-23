/* eslint-disable */
import { expect } from "chai";
import ReservationController from "../../../src/controllers/ReservationController";
import { Reservation } from "../../../src/models/Reservation";
import sinon from "sinon";
import { Travels } from "../../../src/models/Travels";

describe("ReservationController", () => {
  let sandbox;
  let req;
  let res;

  beforeEach(() => {
    sandbox = createSandbox();

    req = TestUtils.mockReq();
    res = TestUtils.mockRes();
  });

  describe("create()", () => {
    it("should return 404 if travel is not found", async () => {
      const req = {
        body: {
          travel: "nonexistentTravelID",
        },
        userId: "user123",
      };

      const travelStub = sandbox.stub(Travels, "findById");
      travelStub.resolves(null);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ReservationController.create(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: "Viagem não encontrada" });
    });

    it("should return 404 if no available seats", async () => {
      const req = {
        body: {
          travel: "nonexistentTravelID",
        },
        userId: "user123",
        params: {
          id: "reservationId",
        },
      };

      const travelStub = sandbox.stub(Travels, "findById");
      travelStub.resolves({
        availableSeatsNumber: 0,
      });

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ReservationController.create(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, {
        message: "Não há mais assentos disponíveis para essa viagem",
      });
    });

    it("should return 400 if reservation limit is reached", async () => {
      const req = {
        body: {
          travel: "reservationLimitReachedTravelID",
        },
        userId: "user123",
      };

      const travelStub = sandbox.stub(Travels, "findById");
      travelStub.resolves({
        availableSeatsNumber: 2,
      });

      const reservationStub = sandbox.stub(Reservation, "find");
      reservationStub.resolves([{}, {}]);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await ReservationController.create(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        message: "Limite máximo de reservas atingido.",
      });
    });
  });

  describe("update()", () => {
    let findByIdStub;
    let updateOneStub;

    beforeEach(() => {
      findByIdStub = sandbox.stub(Reservation, "findById");
      updateOneStub = sandbox.stub();

      req.userId = "123456789000";
      req.params = { id: "reservation_id" };
      req.body = {
        travel: "travel_id",
      };
    });

    it("should return 404 if reservation is not found", async () => {
      findByIdStub.resolves(null);

      const { status, json } = await ReservationController.update(req, res);

      expect(status).to.equal(404);
      expect(json).to.deep.equal({
        message: "Reserva não encontrada.",
      });
    });

    it("should return 404 if travel is not found", async () => {
      findByIdStub.resolves({});
      sandbox.stub(Travels, "findById").resolves(null);

      const { status, json } = await ReservationController.update(req, res);

      expect(status).to.equal(404);
      expect(json).to.deep.equal({
        message: "Viagem não encontrada.",
      });
    });

    it("should return 404 if there are no available seats for the travel", async () => {
      findByIdStub.resolves({});
      sandbox.stub(Travels, "findById").resolves({ availableSeatsNumber: 0 });

      const { status, json } = await ReservationController.update(req, res);

      expect(status).to.equal(404);
      expect(json).to.deep.equal({
        message: "Não há mais assentos disponíveis para essa viagem.",
      });
    });

    it("should return 400 if user reaches the maximum number of reservations", async () => {
      findByIdStub.resolves({});
      sandbox.stub(Travels, "findById").resolves({ availableSeatsNumber: 2 });
      sandbox.stub(Reservation, "find").resolves([{}, {}]);

      const { status, json } = await ReservationController.update(req, res);

      expect(status).to.equal(400);
      expect(json).to.deep.equal({
        message: "Limite máximo de reservas atingido.",
      });
    });

    it("should return 500 if an error occurs", async () => {
      findByIdStub.rejects({ message: "Erro ao buscar reserva" });

      const { status, json } = await ReservationController.update(req, res);

      expect(status).to.equal(500);
      expect(json).to.deep.equal({ message: "Erro ao buscar reserva" });
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
