import express from 'express';
import { shortenUrl, redirectUrl, getUrlStatsHandler } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);


router.get('/:short_code', redirectUrl);

router.get('/stats/:short_code', getUrlStatsHandler);


export default router;
