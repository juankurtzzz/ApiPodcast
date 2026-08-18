import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log("API running on " + PORT)
});
