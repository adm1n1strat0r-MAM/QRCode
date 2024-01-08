import express, { json } from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import infoRouter from './routers/info.router.js';

const app = express();
app.use(cors());
app.use(json());
app.use(infoRouter);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
