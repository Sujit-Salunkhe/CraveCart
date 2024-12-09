
import jwt from "jsonwebtoken";
// @ decs Auth user & get Token
// const envPath = path.resolve(
//   "C:\\Users\\Sujit\\OneDrive\\Desktop\\Practice\\foodDelivery\\cravecart\\.env"
// );
const generateToken = (res, payload) => {
  // console.log(payload)
  const token = jwt.sign(payload, process.env.JWT_SECREAT,{expiresIn:'30d'});
//   res.send("user is created")
  res.cookie("jwt", token, {
    httpOnly: true,
    // secure: false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
