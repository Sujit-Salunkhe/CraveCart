import UserModel from "../models/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generatetoken.js";
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await UserModel.find({ email: `${email}` });
  if (userExist.length === 1) {
    res.status(400).send("User Allready existed");
  }
  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, { name, email });
      res.status(201).send("New User is Created");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existedUser = await UserModel.find({ email: `${email}` });
  const property = existedUser[0];

  if (!existedUser) {
    res.status(401).send("User Not found");
  } else if (existedUser[0].password !== password) {
    res.status(400).send("email or password is Wrong");
  } else {
    generateToken(res, { name: property.name, email: property.email });
    // res.status(200).send("Token is created successfully");
  }
});

export { addUser, logInUser };
