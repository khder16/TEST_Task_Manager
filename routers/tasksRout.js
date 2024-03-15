import { Router } from 'express'
import { createUserTask, getUserTasks, getTaskById, deleteTask, updateTask } from '../controllers/tasks.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const router = Router()



router.route('/:_id/createtask').post(verifyToken, createUserTask)
router.route('/:_id/usertasks').get(verifyToken, getUserTasks)
router.route('/:taskId/usertask').get(verifyToken, getTaskById)
router.route('/:taskId/deletetask').delete(verifyToken, deleteTask)
router.route('/:taskId/updatetask').put(verifyToken, updateTask)








export default router