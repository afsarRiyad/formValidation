import express from "express";
import validateRegistration from "./formValidation.js";

const app = express();
app.use(express.json());
const port = 5000;

app.post("/registration",validateRegistration, (req, res) => {
  res.send("registration successful!");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server running in port ${port}`);
});
