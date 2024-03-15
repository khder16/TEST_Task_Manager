import User from '../models/users.js'
import Tasks from '../models/tasks.js'
import Joi from 'joi'
import pkg from 'mongoose'
const { create } = pkg



export const createUserTask = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params._id })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { title, description, completed } = req.body

        if (!(title && description && completed)) {
            throw new Error('Please provide all task information')
        }

        const createdTask = await Tasks.create({
            title: title,
            user: req.params._id,
            description: description,
            completed: completed
        })
        res.status(200).json(createdTask)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred while creating the task' })
    }
}

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().required()
})


export const getUserTasks = async (req, res) => {
    try {
        const userId = req.params._id
        const tasks = await Tasks.find({ user: userId })

        if (!tasks) {
            return res.status(404).json({ message: 'Tasks not found for this user' })
        }

        return res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred while fetching user tasks' })
    }
}

export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const task = await Tasks.findOne({ _id: taskId })

        if (!task) {
            return res.status(404).json({ message: 'Task not found for this user' })
        }

        return res.status(200).json(task)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred while fetching the task' })
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const updatedTask = await Tasks.findOneAndUpdate({ _id: taskId, user: req.user._id }, req.body, { new: true })

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or user not authorized to update this task' })
        }

        return res.status(200).json(updatedTask)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred while updating the task' })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const deletedTask = await Tasks.findOneAndDelete({ _id: taskId, user: req.user._id })

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found or user not authorized to delete this task' })
        }

        return res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred while deleting the task' })
    }
}