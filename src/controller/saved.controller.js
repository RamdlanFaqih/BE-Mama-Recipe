const savedModel = require("../model/saved.model");

const savedController = {
  list: (req, res) => {
    savedModel
      .selectAll()
      .then((result) => {
        res.status(200).json({ message: result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },

  getBySavedRecipes_ID: (req, res) => {
    const saved_recipes_id = req.params.saved_recipes_id;
    savedModel
      .selectBySavedRecipes_ID(saved_recipes_id)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getSavedByUsers_ID: (req, res) => {
    const users_id = req.params.users_id;
    savedModel
      .selectSavedByUsers_ID(users_id)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getSavedByUsersAndRecipe_ID: (req, res) => {
    const users_id = req.params.users_id;
    const recipes_id = req.params.recipes_id;
    savedModel
      .selectSavedByUsersAndRecipes(users_id, recipes_id)
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
      savedModel
        .insertData(users_id, recipes_id)
        .then((result) => {
          res.json({
            data: result,
            message: "Saved successfully",
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
    const saved_recipes_id = req.params.saced_recipes_id;
    savedModel
      .destroyData(saved_recipes_id)
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

  unsaved: (req, res) => {
    const users_id = req.params.users_id;
    const { recipes_id } = req.body;
    savedModel
      .unsavedData(users_id, recipes_id)
      .then((result) => {
        res.json({
          data: result,
          message: "unsaved successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
};

module.exports = savedController;
