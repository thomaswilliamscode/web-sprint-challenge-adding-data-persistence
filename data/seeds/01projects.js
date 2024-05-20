/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').truncate()
  await knex('projects').insert([
		{
			project_name: 'Take Over The World',
			project_completed: false,
		},
		{
			project_name: 'Snuggle Some Bunnies',
			project_completed: false,
		},
		{
			project_name: 'Pick Flowers For Jess',
			project_description: 'Make A fresh Flower Bouquet',
			project_completed: true,
		},
	]);
};
