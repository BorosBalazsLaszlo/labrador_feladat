import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`A szerver fut a http://localhost${PORT} címen.`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();