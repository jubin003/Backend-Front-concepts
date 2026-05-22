import express from 'express'
import {userRegister,userLogin} from '../controllers/user.controller.js'
import {schemaRegister,schemaLogin} from '../validation/auth.validation.js'
import { validate } from '../middleware/validation.midleware.js';


const router = express.Router();

router.post('/register',validate(schemaRegister),userRegister);
router.post('/login',validate(schemaLogin),userLogin);

export default router;