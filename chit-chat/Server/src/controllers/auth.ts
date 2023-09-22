import bcrypt from "bcrypt";
import User from "../models/User";

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

export function authLogInHanlder(req:any,res:any){
  
}