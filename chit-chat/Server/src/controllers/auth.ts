import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

export function authSignUpHanlder(req: any, res: any) {
  const {
    username,
    mob_number,
    email,
    password,
  }: { username: string; mob_number: string; email: string; password: string } =
    req.body;

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      if (err) throw new Error("Error while generating hash");
      else if (hash) {
        const newUser = await User.create({
          username,
          email,
          mob_number,
          password: hash,
        });
        res.statusMessage = "User Registered and account created successfully";
        res.status(200).json(newUser);
      }
    } catch (error) {
      console.log(err);
      res.statusMessage =
        "E-mail or Mobile Number already exists. Please try again!!!";
      res.status(400).json(err);
    }
  });
}

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ userID: id }, process.env.SECRET_AUTH_KEY as string);
};

export async function authLogInHanlder(req: any, res: any) {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const user: any = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User Not found");
    bcrypt.compare(password, user.password, async (err, result) => {
      try {
        if (err) throw new Error("Error in hash");
        if (!result) throw new Error("User Not Authorized!!!");
        else {
          const updatedUser: any = await user.update({ isLogged: true });
          const { password, ...otherData } = updatedUser.dataValues;
          res.status(200).json({
            user: { ...otherData },
            token: generateAccessToken(user.id),
            message: "User Logged In successfully",
          });
        }
      } catch (err: any) {
        console.log(err.message);
        res.status(400).json(err.message);
      }
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
}

export async function authLogOutHanlder(req: any, res: any) {
  try {
    const currentUser = req.user;
    const updatedUser = await currentUser.update({ isLogged: false });
    res.status(200).json("Logged Out Successfully");
  } catch (error) {
    res.status(400).json("Error logging out");
  }
}

export async function getOnlineUsers(req: any, res: any) {
  try {
    let onlineUsers: any = await User.findAll({
      where: {
        isLogged: true,
      },
    });
    // console.log("online ", onlineUsers);
    onlineUsers = onlineUsers.map((user: any) => {
      const {
        id,
        isLogged,
        email,
        mob_number,
        createdAt,
        updatedAt,
        username,
      } = user;

      return {
        id,
        isLogged,
        email,
        mob_number,
        createdAt,
        updatedAt,
        username,
      };
    });
    res.status(200).json(onlineUsers);
  } catch (error) {
    res.status(400).json("Error get online users out");
  }
}
