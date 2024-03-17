import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import Jwt from "jsonwebtoken";
import { JWT_TOKEN_SECRET_KEY } from "../utils/constants.js";
import User from "../models/User.js";
export const Register = async (req,res)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
     const {username,password,email}= req.body


    const userExist = await User.findOne({ $or: [{
        email:email
    },{
        username:username
    }
]});

if(userExist){
    return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Email already exists"))
}

     try {
        const result = await User.create({
            email:email,
            password:password,
            username:username,
        })

     return  res.json(jsonGenerate(statusCode.SUCCESS,"registration successfull",{userId:result._id}))
     } catch (error) {
        console.log(error)
     }
    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"validation error",errors.mapped()))

}