const express = require("express");
const router = express.Router();
const {
  list,
  getByLikedRecipes_ID,
  getLikedByUsers_ID,
  getLikedByUsersAndRecipe_ID,
  insert,
  destroy,
  unlike,
} = require("../controller/liked.controller");

router
  .get("/liked", list)
  .get("/liked/:liked_recipes_id", getByLikedRecipes_ID)
  .get("/liked/users/:users_id", getLikedByUsers_ID)
  .get("/liked/check/:users_id/:recipes_id", getLikedByUsersAndRecipe_ID)
  .post("/liked/insert/:users_id", insert)
  .delete("/liked/delete/:users_id", destroy)
  .delete("/liked/unlike/:users_id", unlike);

module.exports = router;
