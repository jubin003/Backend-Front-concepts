const Express= require('express')
const router= Express.Router()
const {getTasks,getTask,createTask,deleteTask, updateTask}=require('../controllers/task.controller.js')

router.get('/all',getTasks);
router.post('/create',createTask);
router.get('/:id',getTask);
router.delete('/:id',deleteTask)
router.patch('/:id',updateTask)

module.exports= router
