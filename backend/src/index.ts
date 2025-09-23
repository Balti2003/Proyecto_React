import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import authRouter from './routes/auth';
import characterRouter from './routes/character';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/characters', characterRouter);

app.get('/', (_req, res) => {
  res.send('Backend de Autenticación y Gestión de Personajes en Express');

});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

