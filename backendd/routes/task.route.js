import Express from 'express';
const router= Express.Router()
import {getTasks,getTask,createTask,deleteTask, updateTask}from '../controllers/task.controller.js';
import {protect} from '../middleware/auth.middleware.js'

router.get('/all',protect,getTasks);
router.post('/create',protect,createTask);
router.get('/:id',protect,getTask);
router.delete('/:id',protect,deleteTask)
router.patch('/:id',protect,updateTask)

export default router;