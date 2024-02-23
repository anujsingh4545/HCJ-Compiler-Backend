import jwt from "jsonwebtoken";
import "dotenv/config";

const protectUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    jwt.verify(token, process.env.JWTSECRET, (err, decode) => {
      if (err) {
        return res.status(403).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Auth error",
      success: false,
    });
  }
};

export default protectUser;
