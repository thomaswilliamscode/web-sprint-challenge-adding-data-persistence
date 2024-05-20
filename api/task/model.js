// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
// 	select
//     p.project_name,
//     p.project_description
// from projects as p
// left join tasks as t
//     on p.project_id = t.project_id;
		const query = await db('tasks as t')
			.leftJoin('projects as p', 't.project_id', 'p.project_id')
			.select(
				't.task_id',
				't.task_description',
				't.task_notes',
				't.task_completed',
				't.project_id',
				'p.project_name',
				'p.project_description'
			);

		const taskMap = query.map((task) => {
			if (task.task_completed === 0) {
				return {
					...task,
					task_completed: false,
				};
			} else if (task.task_completed === 1) {
				return {
					...task,
					task_completed: true,
				};
			}
		});
		return taskMap;
	};

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