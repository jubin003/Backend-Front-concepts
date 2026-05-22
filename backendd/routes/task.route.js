import Express from 'express';
const router= Express.Router()
import {getTasks,getTask,createTask,deleteTask, updateTask}from '../controllers/task.controller.js';
import {protect} from '../middleware/auth.middleware.js'
import {schemaTask} from '../validation/task.validation.js'
import {validate} from '../middleware/validation.midleware.js'
import { allRateLimit } from '../middleware/rateLimit.middleware.js';


router.get('/all',allRateLimit,protect,getTasks);
router.post('/create',allRateLimit,protect,validate(schemaTask),createTask);
router.get('/:id',allRateLimit,protect,getTask);
router.delete('/:id',allRateLimit,protect,deleteTask)
router.patch('/:id',allRateLimit,protect,updateTask)

export default router;