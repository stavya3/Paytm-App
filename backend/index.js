const express = require("express");
const mainRouter = require("../backend/routes/index")
const cors = require("cors");


const app = express();

app.use("/api/v1", mainRouter); // app.use is used to also route the requests with a specfic string
app.listen(3000);
app.use(cors());
app.use(express.json());