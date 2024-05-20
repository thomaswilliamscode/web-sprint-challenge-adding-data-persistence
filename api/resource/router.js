// build your `/api/resources` router here
const express = require('express')
const router = express.Router()
const Model = require('./model')
const Middle = require('./middle')

router.get('/', async (req, res) => {
	const info = await Model.get()
	res.status(200).json(info)
})

router.get('/:id', Middle.checkId, async (req, res) => {
	res.status(200).json(req.obj)
});

router.post('/', Middle.checkBody, async (req, res) => {
	const { resource } = req
	const newResource = await Model.post(resource)
	res.status(200).json(newResource)
})

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		customMessage: 'something terrible inside the resource Router',
		message: err.message,
		stack: err.stack,
	});
});


module.exports = router