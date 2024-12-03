import { profileEnd } from 'console';
import jwt from 'jsonwebtoken'
const envPath = path.resolve(
    "C:\\Users\\Sujit\\OneDrive\\Desktop\\Practice\\foodDelivery\\cravecart\\.env"
  );
const generateToken = (payload) => {
   const token = jwt.sign(payload,process.env.JWT_SECREAT)
}