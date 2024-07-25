const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ecRoutes = require("./src/routes/api/EnergyConsumption");
const wdcRoutes = require("./src/routes/api/WorldDataCountries");

app.use("/api/ecs", ecRoutes);
app.use("/api/world-data", wdcRoutes);
// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));