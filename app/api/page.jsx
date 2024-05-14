// Assuming you're using a library like 'pg' for PostgreSQL connections

import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
  });

  await client.connect();

  const response = await fetch('STRAPI_API_URL/clerkUsers');
  const data = await response.json();

  // Assuming your table is named 'clerk_users'
  data.forEach(async (user) => {
    const { id, name, email } = user;
    await client.query('INSERT INTO clerk_users (id, name, email) VALUES ($1, $2, $3)', [id, name, email]);
  });

  await client.end();

  res.status(200).json({ message: 'Data loaded into PostgreSQL' });
}
