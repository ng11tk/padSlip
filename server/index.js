import express from "express";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());

app.get("/getData", (req, res) => {
  console.log("🚀 ~ file: index.js:8 ~ app.get ~ req:", req.query);

  res.send("hello from backend");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
