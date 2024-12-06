import express from 'express'
import { addUser,logInUser } from '../RouteHandleres/Users.js'; 

const router = express.Router();


router.route('/register').post(addUser)
router.route('/login').post(logInUser)
export default router;