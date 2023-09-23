import { Router } from "express";
import emailInUse from "../middlewares/emailInUse";
import limitRequests from "../middlewares/limitRequests";
import SessionController from "../controllers/SessionController";

const router = Router();

router.post("/", limitRequests.heavily, emailInUse, SessionController.auth);

export default { router, name: "/auth" };
