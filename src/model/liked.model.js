const db = require("../config/db");

const likedModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM liked_recipes", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  selectByLikedRecipes_ID: (liked_recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM liked_recipes WHERE liked_recipes_id = ${liked_recipes_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectLikedByUsers_ID: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          my_recipes.food_name,
          my_recipes.image AS recipe_image,
          users.name AS user_name,
          liked_recipes.recipes_id
          FROM liked_recipes
          JOIN my_recipes ON liked_recipes.recipes_id = my_recipes.recipes_id
          JOIN users ON liked_recipes.users_id = users.users_id
          WHERE liked_recipes.users_id = ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectLikedByUsersAndRecipes: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM liked_recipes WHERE users_id = ${users_id} AND recipes_id = ${recipes_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  insertData: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO liked_recipes(users_id, recipes_id) VALUES
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
  destroyData: (liked_recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM liked_recipes WHERE liked_recipes_id =${liked_recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  unlikeData: (users_id, recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM liked_recipes WHERE users_id = ${users_id} AND recipes_id = ${recipes_id}`,
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

module.exports = likedModel;
