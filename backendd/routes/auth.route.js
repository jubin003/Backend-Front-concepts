import express from 'express'
import {userRegister,userLogin} from '../controllers/user.controller.js'
import {schemaRegister,schemaLogin} from '../validation/auth.validation.js'
import { validate } from '../middleware/validation.midleware.js';
import { allRateLimit } from '../middleware/rateLimit.middleware.js';


const router = express.Router();

router.post('/register',allRateLimit,validate(schemaRegister),userRegister);
router.post('/login',allRateLimit,validate(schemaLogin),userLogin);

export default router;