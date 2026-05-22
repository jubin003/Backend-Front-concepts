import Express from 'express';
const router= Express.Router()
import {getTasks,getTask,createTask,deleteTask, updateTask}from '../controllers/task.controller.js';
import {protect} from '../middleware/auth.middleware.js'
import {schemaTask} from '../validation/task.validation.js'
import {validate} from '../middleware/validation.midleware.js'


router.get('/all',protect,getTasks);
router.post('/create',validate(schemaTask),protect,createTask);
router.get('/:id',protect,getTask);
router.delete('/:id',protect,deleteTask)
router.patch('/:id',protect,updateTask)

export default router;