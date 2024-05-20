// build your `Project` model here
const db = require('../../data/dbConfig')

const get = async () => {
	let projects = await db('projects')
	let answer = []

	const projectsMapped = projects.map( (obj) => {
		const { project_id, project_name, project_description, project_completed } = obj

		let bool = false

		if(project_completed){
			bool = true
		}

		let newProjects = {
			project_id: project_id, project_name: project_name, project_description: project_description, project_completed: bool
		}

		answer.push(newProjects)


	})

	return answer
}

const getById = async (id) => {
	const answer = await db('projects')
		.where('project_id', id)
return answer[0]
}

const post = async (info) => {
// 	insert into projects(project_name,project_description, project_completed)
// values('testing', 'description here', 0);

const newProject = await db('projects')
	.insert(info)

return getById(newProject[0])
}



module.exports = {
	get,
	post,
	getById
}