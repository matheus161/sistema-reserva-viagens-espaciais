import { Router } from "express";
import UserController from "../controllers/UserController";
import limitRequests from "../middlewares/limitRequests";
import verifyId from "../middlewares/verifyId";
import { ensureManager } from "../middlewares/ensureManager";
import ensureAuthenticate from "../middlewares/ensureAuthenticate";

const router = Router();

router.use(limitRequests.slightly);

router.get("/", ensureAuthenticate, ensureManager, UserController.getAll);
router.get("/:id", ensureAuthenticate, verifyId, UserController.getById);

router.put("/", ensureAuthenticate, UserController.update);
router.delete("/", ensureAuthenticate, UserController.remove);

export default { router, name: "/user" };
