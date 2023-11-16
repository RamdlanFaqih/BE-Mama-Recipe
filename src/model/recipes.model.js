const db = require("../config/db");

const recipesModel = {
selectAll: (search, sort, limit, offset) => {
  let sortDirection = sort === "DESC" ? "DESC" : "ASC";
  let cleanSearch = search.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  let searchTerm = `%${cleanSearch}%`;

  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT * FROM my_recipes 
      WHERE LOWER(food_name) ILIKE '%${searchTerm}%' OR 
            LOWER(food_name) ILIKE '% ${searchTerm}%' OR 
            LOWER(food_name) ILIKE '%${searchTerm} %'
      ORDER BY food_name ${sortDirection}
      LIMIT ${limit} OFFSET ${offset}
    `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
},

selectPaginate: () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS total FROM my_recipes", (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
},



  pagination: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM my_recipes LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByRecipes_ID: (recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM my_recipes WHERE recipes_id = ${recipes_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectRecipesByUsers_ID: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM my_recipes WHERE users_id = ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  insertData: (food_name, image, ingredients, video_title, video, users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO my_recipes(food_name, image, ingredients, video_title, video, users_id) VALUES 
          ('${food_name}', '${image}', '${ingredients}', '${video_title}', '${video}', ${users_id})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateData: ({
    recipes_id,
    food_name,
    image,
    ingredients,
    video_title,
    video,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE my_recipes SET food_name='${food_name}', image='${image}', ingredients='${ingredients}', video_title='${video_title}', video='${video}' WHERE recipes_id=${recipes_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  destroyData: (recipes_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM my_recipes WHERE recipes_id=${recipes_id}`,
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

module.exports = recipesModel;
