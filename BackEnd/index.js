const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

const blog = require("./routes/blog");

app.use("/", blog);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectWithDb = require("./config/database");
connectWithDb();

app.get("/", (req, res) => {
    res.send(`<h1>Server is running</h1>`);
})


