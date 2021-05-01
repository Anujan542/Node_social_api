const express = require("express");
const dotenv = require("dotenv");
const color = require("colors");
const helmet = require("helmet");
const morgan = require("morgan");

const db = require("./config/db");

dotenv.config();
db();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

/// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/post", require("./routes/postRoute"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is runing on ${port}`.cyan.bold);
});
