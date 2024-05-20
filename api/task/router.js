// build your `/api/tasks` router here
const express = require('express')
const router = express.Router()

const Middle = require('./middle')
const Model = require('./model')

router.get('/', async (req, res) => {
	const info = await Model.getAll()
	res.status(200).json(info)
})

router.get('/:id', Middle.idCheck, async (req, res) => {
	const task = req.task
	res.status(200).json(task)

})

router.post('/', Middle.bodyCheck, async (req, res) => {
	const newTask = await Model.post(req.info)
	const updated = Model.edit(newTask)
	res.status(200).json(updated)
})

router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
		customMessage: 'Something terrible inside the tasks router',
		message: err.message,
		stack: err.stack
	})
})

module.exports = router