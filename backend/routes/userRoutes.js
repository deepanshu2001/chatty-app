import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import {getusersforSidebar} from '../controllers/usercontroller.js'
const router=express.Router();

router.get("/",protectRoute,getusersforSidebar);
export default router