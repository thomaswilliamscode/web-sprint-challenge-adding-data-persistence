const Model = require('./model')

const idCheck = async (req, res, next) => {
	const { id } = req.params
	const isValid = await Model.getById(id)

	if (isValid) {
		req.task = isValid
		next()
	} else {
		res.status(404).json({message: `id: ${id}, not valid`})
	}
}

const bodyCheck = async (req, res, next) => {
	const { task_description, task_notes, task_completed, project_id} = req.body

	if ( task_description && project_id) {
		let completed = false
		// check project id
		// check completed
		if (task_completed) {
			completed = true
		}

		const isValid = await Model.getProjectId(project_id)

		if (!isValid) {
			res.status(404).json({message: `project_id: ${project_id}, not valid`})
		} else {
			let newObj = {
				task_description: task_description,
				task_notes: task_notes != undefined ? task_notes : null,
				task_completed: completed,
				project_id: project_id,
			};

			// if body is good save it
			req.info = newObj
			next()
		}
	} else {
		res.status(400).json({message: `please provide task_description and project_id`})
	}
}


module.exports = {
	idCheck,
	bodyCheck
}