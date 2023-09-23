import { User } from "../models/User";

async function ensureManager(req, res, next) {
  const { user_id } = req;

  const user = await User.findById(user_id);

  if (!user.isManager) {
    return res.status(401).json({
      status: "error",
      message: "User isn't admin.",
    });
  }

  return next();
}

export { ensureManager };
