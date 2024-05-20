/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('resources').truncate()
  await knex('resources').insert([
		{
			resource_name: 'mind control device',
			resource_description: 'device that controls peoples minds',
		},
		{
			resource_name: 'bunny costume'
		},
		{ resource_name: 'scissors'},
	]);
};
