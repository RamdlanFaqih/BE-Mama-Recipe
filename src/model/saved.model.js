const db = require("../config/db");

const savedModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM saved_recipes", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  selectBySavedRecipes_ID: (saved_recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM saved_recipes WHERE saved_recipes_id = ${saved_recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectSavedByUsers_ID: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT my_recipes.food_name, my_recipes.image, saved_recipes.recipes_id
         FROM saved_recipes
         JOIN my_recipes ON saved_recipes.recipes_id = my_recipes.recipes_id
         WHERE saved_recipes.users_id = ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectSavedByUsersAndRecipes: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM saved_recipes WHERE users_id = ${users_id}, AND reipes_id = ${recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  insertData: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO saved_recipes(users_id, recipes_id) VALUES
                (${users_id}, ${recipes_id})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  destroyData: (saved_recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM saved_recipes WHERE saved_recipes_id =${saved_recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  unsavedData: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM saved_recipes WHERE users_id = ${users_id} AND recipes_id = ${recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = savedModel;
