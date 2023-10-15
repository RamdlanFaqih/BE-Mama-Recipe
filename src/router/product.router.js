const express = require("express");
const router = express.Router();
const {
  list,
  getByRecipes_ID,
  insert,
  update,
  destroy
} = require("../controller/product.controller");
const upload = require("../middleware/upload");


router
  .get("/product", list)
  .get("/product/:recipes_id", getByRecipes_ID)
  // tambah data(post)
  .post("/tambahproduct", upload, insert)
  .put("/updateproduct/:recipes_id", upload, update)
  .delete("/hapusproduct/:recipes_id", destroy);

module.exports = router;