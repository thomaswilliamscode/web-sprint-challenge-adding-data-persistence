// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
	let newArray = []
	const array = await db('tasks')

	for (let i = 0; i < array.length; i++) {
		let completed = false;
		const {
			task_id,
			task_description,
			task_notes,
			task_completed,
			project_id,
		} = array[i]

		const project = await db('projects').where('project_id', project_id);

		const { project_name, project_description } = project;

		if (task_completed) {
			completed = true;
		}

		let newObj = {
			task_id: task_id,
			task_description: task_description,
			task_notes: task_notes,
			task_completed: completed,
			project_name: project_name,
			project_description: project_description,
		};

		newArray.push(newObj);
	}


	return newArray
}

const getById = async (id) => {
	const array = await db('tasks')
		.where('task_id', id)

	return array[0]
}

const getProjectId = async (id) => {
	const isValid = await db('projects')
		.where('project_id', id)

	if (isValid.length) {
		return true
	} else return false
}

const post = async (info) => {
	const array = await db('tasks')
		.insert(info)



	const newTask = await getById(array[0])
	return newTask
}

const edit = (info) => {
	const { task_id, task_description, task_notes, task_completed, project_id} = info

	let completed = false
	if (task_completed) {
		completed = true
	}

	let newObj = {
		task_id: task_id,
		task_description: task_description,
		task_notes: task_notes,
		task_completed: completed,
		project_id: project_id,
	};
	return newObj
}


module.exports = {
	getAll,
	getById,
	getProjectId,
	post,
	edit
}