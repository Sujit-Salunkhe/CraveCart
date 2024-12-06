import UserModel from "../models/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generatetoken.js";
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await UserModel.find({email:`${email}`})
  if(userExist.length === 1){
    res.status(400).send("User Allready existed")
  }
  try {
    const user = await UserModel.create({
      name,email,password
    });
    if(user){
      generateToken(res,{name,email,password})
      res.status(201).send("New User is Created");
    }
  } catch (error) {
    res.status(400).send(error)
  }

});

const logInUser = (req,res) => {
  const {email,password} = req.body;
  const existedUser = UserModel.findOne({email:email})
  if(!existedUser){
    res.status(401).send("User Not found")
  }
  if(existedUser.password !== password ){
    res.status(400).send("email or password is Wrong")
  }
  generateToken(existedUser,process.env.JWT_SECREAT)

}

export { addUser,logInUser };
