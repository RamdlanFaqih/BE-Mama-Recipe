const likedModel = require("../model/liked.model");

const likedController = {
  list: (req, res) => {
    likedModel
      .selectAll()
      .then((result) => {
        res.status(200).json({ message: result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
  getByLikedRecipes_ID: (req, res) => {
    const liked_recipes_id = req.params.liked_recipes_id;
    likedModel
      .selectByLikedRecipes_ID(liked_recipes_id)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getLikedByUsers_ID: (req, res) => {
    const users_id = req.params.users_id;
    likedModel
      .selectLikedByUsers_ID(users_id)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  insert: (req, res) => {
    try {
      const users_id = req.params.users_id;
      const { recipes_id } = req.body;
      likedModel
        .insertData(users_id, recipes_id)
        .then((result) => {
          res.json({
            data: result,
            message: "Liked successfully",
          });
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  destroy: (req, res) => {
    const liked_recipes_id = req.params.recipes_id;
    likedModel
      .destroyData(liked_recipes_id)
      .then((result) => {
        res.json({
          data: result,
          message: "data berhasil dihapus",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
};

module.exports = likedController;
