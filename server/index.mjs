import express from 'express';
import cors from 'cors';

import './config/loadEnvironment.mjs';

import userModule from './modules/users.module.mjs';
import authModule from './modules/auth.module.mjs';
import seatModule from './modules/seats.module.mjs';
import metadataModule from './modules/metadata.module.mjs';

const PORT = process.env.PORT || 6969;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userModule.router);
app.use("/auth", authModule.router);
app.use("/seat", seatModule.router);
app.use("/metadata", metadataModule.router);

app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
  })

app.listen(PORT, () => {
    console.log(`Server started, listening in port ${PORT}`);
})