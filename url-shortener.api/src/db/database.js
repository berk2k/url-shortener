import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

export const initDb = async () => {
  
  const dbDir = path.resolve('./url-shortener.api/src/db');
  
  try {
    
    if (!fs.existsSync(dbDir)) {
      console.log(`dir not exists: ${dbDir}, creating dir...`);
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    const dbPath = path.resolve(dbDir, 'url_shortener.db');
    console.log(`db path: ${dbPath}`);
    
    const db = await open({
      filename: dbPath,
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
    
    console.log('db successfully started');
    return db;
  } catch (error) {
    console.error('db error:', error);
    throw error;
  }
};