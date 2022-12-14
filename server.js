const express = require("express");

const { log } = require("./middleware/log");

const apiRoute = require("./routes/apiRoute");
const htmlRoute = require("./routes/htmlRoute");

const PORT = process.env.PORT || 8001;

const app = express();
app.use(log);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", apiRoute);
app.use("/", htmlRoute);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}! ✅`)
);
