
const Model = require('./model')

const bodyCheck = (req, res, next) => {
	if (req.body.project_name) {

		const {project_name, project_description, project_completed} = req.body

		let newCompleted = false
		if (project_completed) {
			newCompleted = true
		}

		let newBody = {
			project_name: project_name,
			project_description: project_description != undefined ? project_description : null,
			project_completed: newCompleted
		}

		req.info = newBody;
		next()
	} else {
		res.status(400).json({
			message: 'please provide project_name.'
		})
	}
}

const idCheck = async (req, res, next) => {
	const { id } = req.params
	const isValid = await Model.getById(id)
	console.log(`
	id: ${id},
	isValid: ${isValid}
	`)

	if (!isValid) {
		res.status(404).json({message: `id: ${id} not found`})
	} else {
		req.project = isValid
		next()
	}
}

module.exports = {
	bodyCheck,
	idCheck
}