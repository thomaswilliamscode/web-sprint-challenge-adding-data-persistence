const Model = require('./model')

const checkId = async (req, res, next) => {
	const { id } = req.params
	const isValid = await Model.getById(id)

	if (isValid) {
		req.obj = isValid
		next()
	} else {
		res.status(404).json({
			message: `id: ${id} not found`
		})
	}
}

const checkBody = async (req, res, next) => {
	const {resource_name, resource_description} = req.body

	if(resource_name) {
		const isValid = await Model.bodyCheck(resource_name)

		const resource = {
			resource_name: resource_name,
			resource_description: resource_description != undefined ? resource_description : null
		}

		if (isValid) {
			req.resource = resource
			next()
		} else {
			res.status(400).json({message: `that resource_name: ${resource_name}, is already taken`})
		}
	} else {
		res.status(400).json({
			message: 'please provide valid resource_name'
		})
	}
}

module.exports = {
	checkId,
	checkBody
}