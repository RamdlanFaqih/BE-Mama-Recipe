const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./src/router/user.router");
const productRouter = require("./src/router/product.router");
const port = 3005;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRouter);


app.listen(port, () => {
  console.log(`Mama Recipe Backend listening on port ${port}`);
});