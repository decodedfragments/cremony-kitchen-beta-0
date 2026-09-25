import "dotenv/config";
import { pool } from "./index";
import { seedCatalog } from "./seed-catalog";

seedCatalog()
  .then(async (n) => {
    console.log(`Seeded ${n} products from the live Ceremony Kitchen catalog.`);
    await pool.end();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
