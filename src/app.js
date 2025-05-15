import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import { initDb } from './db/database.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', urlRoutes);

app.get('/', (req, res) => {
  res.send('URL Shortener API');
});


const startServer = async () => {
  try {
    const db = await initDb();
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`server running on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('db error:', error);
  }
};

startServer();
