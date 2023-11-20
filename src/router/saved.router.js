const express = require("express");
const router = express.Router();
const {
    list,
    getBySavedRecipes_ID,
    getSavedByUsers_ID,
    getSavedByUsersAndRecipe_ID,
    insert,
    destroy,
    unsaved
} = require("../controller/saved.controller");

router
    .get("/saved", list)
    .get("/saved/:saved_recipes_id", getBySavedRecipes_ID)
    .get("/saved/users/:users_id", getSavedByUsers_ID)
    .get("/saved/check/:users_id/:recipes_id", getSavedByUsersAndRecipe_ID)
    .post("/saved/insert/:users_id", insert)
    .delete("/saved/delete/:saved_recipes_id", destroy)
    .delete("/saved/unsaved/:users_id", unsaved);

    module.exports = router;