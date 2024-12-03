import UserModel from "../models/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = UserModel.find({email:email})
  if(userExist){
    res.status(400)
    throw new Error("User already Exists");
  }
  const user = await UserModel.create({
    name,email,password
  });
  if(user){
    
  }
  res.status(201).send(data);
});

export { addUser };
