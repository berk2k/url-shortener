
import { generateShortCode } from '../utils/generateCode.js';

export const createShortUrl = async (db, original_url) => {
  const short_code = generateShortCode();

  
  let isUnique = false;
  let attempts = 0;
  let code = short_code;

  while (!isUnique && attempts < 5) {
    const existing = await db.get('SELECT * FROM urls WHERE short_code = ?', [code]);
    if (existing) {
      code = generateShortCode();
      attempts++;
    } else {
      isUnique = true;
    }
  }

  if (!isUnique) {
    throw new Error('Unique short code could not created.');
  }

  await db.run(
    'INSERT INTO urls (short_code, original_url) VALUES (?, ?)',
    [code, original_url]
  );

  return code;
};


export const getOriginalUrl = async (db, short_code) => {
  const row = await db.get('SELECT original_url FROM urls WHERE short_code = ?', [short_code]);
  return row ? row.original_url : null;
};

export const incrementClickCount = async (db, short_code) => {
  await db.run('UPDATE urls SET click_count = click_count + 1 WHERE short_code = ?', [short_code]);
};

export const getUrlStats = async (db, short_code) => {
  const row = await db.get(
    'SELECT original_url, short_code, click_count, created_at FROM urls WHERE short_code = ?',
    [short_code]
  );
  return row || null;
};