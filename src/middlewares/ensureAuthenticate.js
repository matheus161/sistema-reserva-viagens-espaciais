import pkg from "jsonwebtoken";
const { verify } = pkg;

async function ensureAuthenticate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) throw new Error("Sem token", 401);

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = verify(token, process.env.SECRET);
    const { id } = data;

    req.user_id = id;

    return next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError")
      res.status(401).json({ message: "Token expirado" });

    return res.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}.`,
    });
  }
}

export default ensureAuthenticate;
