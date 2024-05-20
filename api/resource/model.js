// build your `Resource` model here
const db = require('../../data/dbConfig')

const get = async () => {
	const info = await db('resources')
	return info;
}

const getById = async (id) => {
	const info = await db('resources')
		.where('resource_id', id)
	return info[0]
};

const bodyCheck = async (name) => {
	const array = await get()
	
	const filtered = array.filter( (obj) => {
		if (obj.resource_name === name) {
			return obj.resource_name
		}
	})

	let length = filtered.length
	if(length) {
		return false
	} else {
		return true
	}
}

const post = async (data) => {
	const array = await db('resources')
		.insert(data)

	const value = await getById(array[0])

	return value
}


module.exports = {
	get,
	getById,
	bodyCheck,
	post
}