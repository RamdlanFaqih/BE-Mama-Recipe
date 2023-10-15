const db = require("../config/db");

const productModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    return db.query(
      `
        SELECT * FROM recipes 
        WHERE food_name LIKE $1
        ORDER BY food_name ${sortDirection}
    `,
      [`%${search}%`]
    );
  },
  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM recipes", (err, res) => {
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
        `SELECT * FROM recipes LIMIT ${limit} OFFSET ${offset}`,
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
      db.query(`SELECT * FROM recipes WHERE recipes_id = ${recipes_id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insertData: (food_name, image, ingredients, video_title, video, comment) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipes(food_name, image, ingredients, video_title, video, comment) VALUES 
          ('${food_name}', '${image}', '${ingredients}', '${video_title}', '${video}', '${comment}')`,
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
    comment
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipes SET food_name='${food_name}', image='${image}', ingredients='${ingredients}', video_title='${video_title}', video='${video}', comment= '${comment}' WHERE recipes_id=${recipes_id}`,
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
      db.query(`DELETE FROM recipes WHERE recipes_id=${recipes_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = productModel;
