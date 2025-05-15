
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export const initDb = async () => {
  const db = await open({
    filename: './src/db/url_shortener.db',
    driver: sqlite3.Database
  });

 
  await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      short_code TEXT UNIQUE,
      original_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      click_count INTEGER DEFAULT 0
    );
  `);

  return db;
};
