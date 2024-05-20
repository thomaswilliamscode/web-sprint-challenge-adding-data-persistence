/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').truncate()
  await knex('tasks').insert([
		{
			task_description: 'do lab research',
			task_notes: 'use big brain',
			task_completed: true,
			project_id: 1,
		},
		{
			task_description: 'get mind control ore',
			task_notes: 'dont get caught',
			task_completed: false,
			project_id: 1,
		},
		{
			task_description: 'create mind control device',
			task_completed: false,
			project_id: 1,
		},
	]);
};
