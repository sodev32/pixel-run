import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database/pixel-run.db');

db.run(`
  CREATE TABLE IF NOT EXISTS scores (
    id TEXT PRIMARY KEY,
    playerName TEXT NOT NULL,
    time REAL NOT NULL
  )
`);

export default db;
