import Express from 'express';
const router= Express.Router()
import {getTasks,getTask,createTask,deleteTask, updateTask}from '../controllers/task.controller.js';

router.get('/all',getTasks);
router.post('/create',createTask);
router.get('/:id',getTask);
router.delete('/:id',deleteTask)
router.patch('/:id',updateTask)

export default router;