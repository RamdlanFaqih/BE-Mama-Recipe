const express = require("express");
const router = express.Router();
const {
  list,
  getByRecipes_ID,
  getRecipesByUsers_id,
  insert,
  update,
  destroy
} = require("../controller/recipes.controller");
const upload = require("../middleware/upload");


router
  .get("/recipes", list)
  .get("/recipes/:recipes_id", getByRecipes_ID)
  .get("/recipes/users/:users_id", getRecipesByUsers_id)
  // tambah data(post)
  .post("/recipes/tambahproduct", upload, insert)
  .put("/recipes/updateproduct/:recipes_id", upload, update)
  .delete("/recipes/hapusproduct/:recipes_id", destroy);

module.exports = router;