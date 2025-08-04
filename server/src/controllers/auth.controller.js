import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const isUserExist = await userModel.findOne({
      username,
    });
    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    
    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password,10)
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res)=>{

    const {username,password} = req.body;

    const user = await userModel.findOne({
        username
    });

    if(!user){
       return res.status(400).json({
        message:"user not found"
       });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
         return res.status(400).json({
        message:"Invalid password"
       });
    }


    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user login successfully",
      user,
    });


}
