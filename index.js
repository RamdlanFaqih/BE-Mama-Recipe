const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./src/router/user.router");
const productRouter = require("./src/router/product.router");
const recipesRouter = require("./src/router/recipes.router");
const foodRouter = require("./src/router/food.router");
const likedRouter = require("./src/router/liked.router");
const port = 3005;


app.use(cors());
app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRouter);
app.use(recipesRouter);
app.use(foodRouter);
app.use(likedRouter);


app.listen(port, () => {
  console.log(`Mama Recipe Backend listening on port ${port}`);
});