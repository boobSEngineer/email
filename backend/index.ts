import express from "express";
import cors from 'cors';

import getRouter from "./router/get";
import addRouter from "./router/add";
import moveRouter from "./router/move";


let PORT = process.env.PORT ?? 4004;

const app = express();
app.listen(PORT);

app.use(cors({
    optionsSuccessStatus: 200,
    origin: true,
    credentials: true
}));
app.use(express.json());

app.use("/api/get", getRouter);
app.use("/api/add", addRouter);
app.use("/api/move", moveRouter);
