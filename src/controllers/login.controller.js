import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET_KEY, statusCode } from "../utils/constants.js";
import  jwt  from "jsonwebtoken";
import  bcrypt from "bcryptjs";

export const Login = async (req,res) =>{
//     const errors = validationResult(req)
//    if(errors.isEmpty()){
//    const {username,password} = req.body;
//    const user = await User.findOne({
//     username:username
//    })

//   if(!user){
//   return  res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Password is incorrect"))
//   }
//   if(password != user.password){
//       return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Password is incorrect"))
//       }


// const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET_KEY);


// return res.json(jsonGenerate(statusCode.SUCCESS,"Login Successful",{userId:user._id,token:token}))
// }

//  return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))

try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id : user.id }, JWT_TOKEN_SECRET_KEY, { expiresIn: '1h' });
    console.log(token,"LogIn Token");
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}