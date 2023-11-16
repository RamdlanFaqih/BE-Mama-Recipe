const express = require("express");
const router = express.Router();
const {
  list,
  getByLikedRecipes_ID,
  getLikedByUsers_ID,
  insert,
  destroy,
} = require("../controller/liked.controller");

router
  .get("/liked", list)
  .get("/liked/:liked_recipes_id", getByLikedRecipes_ID)
  .get("/liked/users/:users_id", getLikedByUsers_ID)
  .post("/liked/insert/:users_id", insert)
  .delete("/liked/delete/:liked_recipes_id", destroy);

module.exports = router;
