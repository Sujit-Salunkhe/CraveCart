import UserModel from "../models/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generatetoken.js";
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name,email,password)
  const userExist = await UserModel.find({email:`${email}`})
  console.log(userExist.length)
  if(userExist.length === 1){
    res.status(400).send("User Allready existed")
  }
  const user = await UserModel.create({
    name,email,password
  });
  if(user){
    generateToken(res,{name,email,password})
  }
  // res.status(201).send(data);
});

export { addUser };
