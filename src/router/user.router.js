const express = require("express");
const router = express.Router();
const {
  list,
  insert,
  register,
  update,
  updateProfile,
  updateProfilePicture,
  login,
  destroy,
  getByUsers_ID,
  pagination,
} = require("../controller/user.controller");
const { isAdmin, isCustomer } = require("../middleware/auth");
const { hitbyID } = require("../middleware/hitByRedis");
const auth = require("../middleware/staticAuth");
const upload = require("../middleware/upload");

router
  // get with redis
  // .get("/getFromRedis/:id", hitbyID, getById)

  .get("/users/:users_id", getByUsers_ID)

  // pagination
  .get("/paginate", pagination)

  // get data
  // .get("/users", auth, isAdmin, list)
  .get("/users", list)

  //insert data (register)
  .post("/insertuser", upload, insert)
  .post("/register", register)

  //update data
  .put("/updatedata/:users_id", upload, update)

  //update profile
  .put("/updateProfile/:users_id", upload, updateProfile)

  //update profile picture
  .put("/updateProfilePicture/:users_id", upload, updateProfilePicture)
  //login & generate token
  .post("/login", login)

  //delete data
  .delete("/hapusdata/:users_id", destroy);

module.exports = router;
