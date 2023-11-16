const express = require("express");
const router = express.Router();
const {
  list,
  getByRecipes_ID,
  getRecipesByUsers_id,
  insertRecipes,
  insert,
  update,
  destroy
} = require("../controller/food.controller");
const upload = require("../middleware/upload");


router
  .get("/food", list)
  .get("/food/:recipes_id", getByRecipes_ID)
  .get("/food/users/:users_id", getRecipesByUsers_id)
  // tambah data(post)
  .post("/food/tambahproduct", upload, insert)
  .post("/food/addrecipes", upload, insertRecipes)
  .put("/food/updateproduct/:recipes_id", upload, update)
  .delete("/food/hapusproduct/:recipes_id", destroy);

module.exports = router;