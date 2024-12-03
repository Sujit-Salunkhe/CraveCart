import express from 'express'
import { addUser } from '../RouteHandleres/Users.js'; 

const router = express.Router();


router.route('/').post(addUser)

export default router;