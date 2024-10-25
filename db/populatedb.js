const { Client } = require("pg");

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  await client.connect();

  await client.query(SQL);

  await client.end();

  console.log("done");
}

main();
