/* eslint-disable */
import { expect } from "chai";
import TravelsController from "../../../src/controllers/TravelsController";
import { Travels } from "../../../src/models/Travels";
import sinon from "sinon";

describe("TravelsController", () => {
  let sandbox;
  let req;
  let res;

  beforeEach(() => {
    sandbox = createSandbox();

    req = TestUtils.mockReq();
    res = TestUtils.mockRes();
  });

  describe("create()", () => {
    let createStub;

    beforeEach(() => {
      createStub = sandbox.stub(Travels, "create");

      req.body = {
        destination: "Lua",
        date: "29/09/2023",
        departureTime: "10:30",
        arrivalTime: "19:30",
        price: 10000.4,
        availableSeatsNumber: 2,
      };
    });

    it("should return 201 and create travel", async () => {
      createStub.resolves(req.body);

      const { status, json } = await TravelsController.create(req, res);

      expect(createStub.calledWith(req.body)).to.be.true;
      expect(status).to.equal(201);
      expect(json).to.deep.equal(req.body);
    });

    it("should return 500 if an error is thrown", async () => {
      createStub.rejects({ message: "Erro ao criar a viagem" });

      const { status, json } = await TravelsController.create(req, res);

      expect(status).to.equal(500);
      expect(json).to.deep.equal({ message: "Erro ao criar a viagem" });
    });
  });

  describe("getAll()", () => {
    let findStub;

    beforeEach(() => {
      findStub = sandbox.stub(Travels, "find");
    });

    it("should return 200 and a list of travels", async () => {
      const travels = [
        {
          destination: "Lua",
          date: "29/09/2023",
          departureTime: "10:30",
          arrivalTime: "19:30",
          price: 10500700.4,
          availableSeatsNumber: 10,
        },
        {
          destination: "Marte",
          date: "30/09/2023",
          departureTime: "14:30",
          arrivalTime: "22:30",
          price: 950000.4,
          availableSeatsNumber: 20,
        },
      ];

      const req = {
        query: {
          limit: 10,
          page: 0,
        },
      };

      findStub.resolves(travels);

      const { status, json } = await TravelsController.getAll(req, res);

      expect(status).to.equal(200);
      expect(json).to.deep.equal({
        results: travels,
        totalItems: travels.length,
        totalPages: 1,
      });
    });

    it("should return 500 if an error is thrown", async () => {
      findStub.rejects({ message: "A busca falhou" });

      const { status, json } = await TravelsController.getAll(req, res);

      expect(status).to.equal(500);
      expect(json).to.deep.equal({ message: "A busca falhou" });
    });
  });

  describe("getAllAvailable()", () => {
    let findStub;

    beforeEach(() => {
      findStub = sandbox.stub(Travels, "find");
    });

    it("should return 200 and a list of travels", async () => {
      const travels = [
        {
          destination: "Lua",
          date: "29/09/2023",
          departureTime: "10:30",
          arrivalTime: "19:30",
          price: 10500700.4,
          availableSeatsNumber: 10,
          isAvailable: true,
        },
        {
          destination: "Marte",
          date: "30/09/2023",
          departureTime: "14:30",
          arrivalTime: "22:30",
          price: 950000.4,
          availableSeatsNumber: 20,
          isAvailable: true,
        },
      ];

      const req = {
        query: {
          limit: 10,
          page: 0,
        },
      };

      findStub.resolves(travels);

      const { status, json } = await TravelsController.getAllAvailable(
        req,
        res
      );

      expect(status).to.equal(200);
      expect(json).to.deep.equal({
        results: travels,
        totalItems: travels.length,
        totalPages: 1,
      });
    });

    it("should return 500 if an error is thrown", async () => {
      findStub.rejects({ message: "A busca falhou" });

      const { status, json } = await TravelsController.getAllAvailable(
        req,
        res
      );

      expect(status).to.equal(500);
      expect(json).to.deep.equal({ message: "A busca falhou" });
    });
  });

  describe("getById()", () => {
    let findStub;

    beforeEach(() => {
      findStub = sandbox.stub(Travels, "findById");
      req.params.id = "123456789000";
    });

    it("should return 200 and user", async () => {
      const travel = {
        destination: "Marte",
        date: "30/09/2023",
        departureTime: "14:30",
        arrivalTime: "22:30",
        price: 950000.4,
        availableSeatsNumber: 20,
        isAvailable: true,
      };

      findStub.resolves(travel);

      const { status, json } = await TravelsController.getById(req, res);

      expect(status).to.equal(200);
      expect(json).to.deep.equal(travel);
    });

    it("should return 500 if an error is thrown", async () => {
      findStub.rejects({ message: "Viagem não encontrada" });

      const { status, json } = await TravelsController.getById(req, res);

      expect(status).to.equal(500);
      expect(json).to.deep.equal({ message: "Viagem não encontrada" });
    });
  });

  describe("update()", () => {
    let findStub;
    let req;
    let res;

    beforeEach(() => {
      findStub = sinon.stub(Travels, "findByIdAndUpdate");

      req = {
        params: {
          id: "some_id_here",
        },
        userId: "123456789000",
        body: {
          destination: "Marte",
          date: "30/09/2023",
          departureTime: "14:30",
          arrivalTime: "22:30",
          price: 950000.4,
          availableSeatsNumber: 20,
          isAvailable: true,
        },
      };

      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return 404 if travel was not found", async () => {
      findStub.returns(null);

      await TravelsController.update(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Viagem não encontrada" })).to.be
        .true;
    });

    it("should return 200 and update travel data", async () => {
      const travel = {
        destination: "Marte",
        date: "30/09/2023",
        departureTime: "14:30",
        arrivalTime: "22:30",
        price: 950000.4,
        availableSeatsNumber: 20,
        isAvailable: true,
      };

      findStub.returns(travel);

      await TravelsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(travel)).to.be.true;
    });

    it("should return 500 if an error is thrown", async () => {
      findStub.throws(new Error("Erro ao atualizar a viagem")); // Simula um erro ao atualizar

      await TravelsController.update(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "Erro ao atualizar a viagem" })).to
        .be.true;
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
