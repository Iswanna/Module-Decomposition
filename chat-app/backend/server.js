import express from "express";

const app = express();
const port = process.env.port || 3000;

const messages = [];

app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`);
});
