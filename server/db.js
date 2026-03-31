const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'database', 'reeves_boutique.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'schema.sql');
const SEED_PATH = path.join(__dirname, '..', 'database', 'seed.sql');

const isNewDb = !fs.existsSync(DB_PATH);
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

if (isNewDb) {
  console.log('🗄️  Creating database...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  console.log('✅ Schema created');

  const seed = fs.readFileSync(SEED_PATH, 'utf8');
  db.exec(seed);
  console.log('✅ Seed data inserted (56 products)');
}

module.exports = db;
