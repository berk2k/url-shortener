import { createShortUrl,getUrlStats  } from '../services/urlService.js';


export const shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) {
    return res.status(400).json({ error: 'original_url can not be empty.' });
  }

  const db = req.app.locals.db;

  try {
    const short_code = await createShortUrl(db, original_url);

    return res.status(201).json({
      short_url: `http://localhost:${process.env.PORT || 3000}/${short_code}`,
      short_code,
      original_url
    });
  } catch (error) {
    console.error('shortener error:', error.message);
    return res.status(500).json({ error: 'error while shortening.' });
  }
};

export const getUrlStatsHandler = async (req, res) => {
  const { short_code } = req.params;
  const db = req.app.locals.db;

  try {
    const stats = await getUrlStats(db, short_code);

    if (!stats) {
      return res.status(404).json({ error: 'Short code not found' });
    }

    return res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

import { getOriginalUrl, incrementClickCount } from '../services/urlService.js';

export const redirectUrl = async (req, res) => {
  const { short_code } = req.params;
  const db = req.app.locals.db;

  try {
    const originalUrl = await getOriginalUrl(db, short_code);

    if (!originalUrl) {
      return res.status(404).send('URL can not found.');
    }

    await incrementClickCount(db, short_code);

    return res.redirect(originalUrl);
  } catch (error) {
    console.error('redirecting error:', error.message);
    return res.status(500).send('server error.');
  }
};



