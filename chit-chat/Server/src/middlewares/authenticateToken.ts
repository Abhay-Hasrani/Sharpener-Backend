import jwt from "jsonwebtoken";
import User from "../models/User";

async function authenticateToken(req: any, res: any, next: any) {
  try {
    const token = req.header("AuthenticationToken");
    const { userID } = jwt.verify(
      token,
      process.env.SECRET_AUTH_KEY as string
    ) as { userID: string };
    const user = await User.findByPk(userID);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Error while authenticating token");
  }
}

export default authenticateToken;
