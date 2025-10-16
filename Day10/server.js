require("dotenv").config({ path: './dev.env' });
const mongoose = require("mongoose");
const http = require("http");
const app = require("./src/app");
// const server= http.createServer(app)

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo DB connected");
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
