const db = require("../config/db");

const userModel = {
  selectAll: (search, sort) => {
    let sortDirection = sort === "DESC" ? "DESC" : "ASC";
    let cleanSearch = search.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
    let searchTerm = `%${cleanSearch}%`;

    return new Promise ((resolve, reject) => {
      db.query(
        `SELECT * FROM users
        WHERE LOWER(users.name) ILIKE '${searchTerm}'
        ORDER BY users.name ${sortDirection}`,
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
      db.query("SELECT COUNT (*) AS total FROM users", (err, res) => {
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
        `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByUsers_ID: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE users_id = ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectUsersWithRecipes: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.users_id, users.name AS user_name, users.image AS user_image, 
        my_recipes.recipes_id, my_recipes.food_name, my_recipes.image AS recipe_image 
        FROM users 
        LEFT JOIN my_recipes ON users.users_id = my_recipes.users_id 
        WHERE users.users_id = ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  insertData: ({
    name,
    email_address,
    phone_number,
    password,
    level,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users(name, email_address, phone_number, password, level, image) VALUES 
          ('${name}', '${email_address}', '${phone_number}', '${password}', '${level}', '${image}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  registerData: ({ name, email_address, phone_number, password, level }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users(name, email_address, phone_number, password, level) VALUES
          ('${name}', '${email_address}', '${phone_number}', '${password}', '${level}')`,
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
    users_id,
    name,
    email_address,
    phone_number,
    password,
    level,
    image,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET name='${name}', email_address='${email_address}', phone_number='${phone_number}', password='${password}', level = '${level}', image = '${image}' WHERE users_id=${users_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateProfile: ({ users_id, name, image }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET name='${name}', image = '${image}' WHERE users_id=${users_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateProfilePicture: ({ users_id, image }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET image = '${image}' WHERE users_id=${users_id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  destroyData: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE users_id=${users_id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  loginUser: (email_address) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email_address = '${email_address}'`,
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

module.exports = userModel;
