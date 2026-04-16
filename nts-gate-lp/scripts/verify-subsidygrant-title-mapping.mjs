import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

const result = await client.query(`
  SELECT "externalId", name, "maxAmountLabel", "deadlineLabel"
  FROM "SubsidyGrant"
  WHERE source = 'jgrants'
  LIMIT 5
`);

console.log(JSON.stringify(result.rows, null, 2));

await client.end();
