/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      role: 'admin',
      first_name: 'John',
      last_name: 'Doe',
      phone: '+54 123684123',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password: '$2b$08$kmYWsCuYDXunsa2DrMU1SOFxnNyo521I14juaOGjYjBXKgN0oZIoa',
      address: 'johndoe street 123',
      gender: 'male',
      birth_date: '1997-01-01',
      country_id: 1,
      city: 'john doe city',
      category: 'example',
      document_id: 1827361,
      user_state: null,
      created_at: '2022-09-05',
      updated_at: '2022-09-05',
      deleted: 0,
      deleted_at: null,
    },
  ]);
};
