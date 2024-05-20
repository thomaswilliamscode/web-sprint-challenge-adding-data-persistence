// build your `/api/projects` router here
const express = require('express')
const router = express.Router()
const Projects = require('./model')
const Middle = require('./middleware')

router.get('/', async (req, res) => {
	const answer = await Projects.get()
	res.status(200).json(answer)
})

router.get('/:id', Middle.idCheck, async (req, res) => {
	res.status(200).json(req.project);
});

router.post('/', Middle.bodyCheck, async (req,res) => {
	const { info } = req
	const newProject = await Projects.post(info)
	res.status(200).json(newProject)
})

router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
		customMessage: 'something terrible inside the Projects Router',
		message: err.message,
		stack: err.stack
	})
})



module.exports = router
