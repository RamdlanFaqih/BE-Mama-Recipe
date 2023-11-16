const userModel = require("../model/user.model");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcrypt");
const cloudinary = require("../helper/cloudinary");

const userController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    userModel
      .selectAll(search, sort)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  pagination: async (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetVallue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    //total page
    const allData = await userModel.selectPaginate();
    // console.log(allData);
    const totalData = Number(allData.rows[0].total);

    userModel
      .pagination(limitValue, offsetVallue)
      .then((result) => {
        // console.log(result);
        const pagination = {
          currentPage: pageValue,
          dataperPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
          totalData,
          result,
        };
        console.log(allData);
        console.log(limitValue);
        res.json({
          message: "OK",
          result: pagination,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  // getByRedisId: (req, res) => {
  //   const id = req.params.id;
  //   userModel
  //     .selectByID(id)
  //     .then((result) => {
  //       const dataRedis = redis.set(
  //         `getFromRedis/${id}`,
  //         JSON.stringify(result),
  //         {
  //           EX: 180,
  //           NX: true,
  //         }
  //       );
  //       res.send({
  //         fromCache: false,
  //         data: dataRedis,
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({ message: err.message });
  //     });
  // },

  getByUsers_ID: (req, res) => {
    const users_id = req.params.users_id;
    userModel
      .selectByUsers_ID(users_id)
      .then((result) => {
        res.send({
          data: result,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getUsersWithRecipes: async (req, res) => {
    try {
      const users_id = req.params.users_id;
      const usersWithRecipes = await userModel.selectUsersWithRecipes(users_id);
      res.status(200).json(usersWithRecipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "interval server error"});
    }
  },

  register: async (req, res) => {
    try {
      const {
        name,
        email_address,
        phone_number,
        password,
        level = 1,
      } = req.body;
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email_address,
            phone_number,
            password: hash,
            level,
          };
          console.log(data);
          userModel
            .registerData(data)
            .then((result) => {
              res.json({
                data: result,
                message: "Insert data berhasil",
              });
            })
            .catch((err) => {
              res.json({ message: err.message });
            });
        }
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  insert: async (req, res) => {
    try {
      const { name, email_address, phone_number, password, level } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);

      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "error hash password" });
        } else {
          const data = {
            name,
            email_address,
            phone_number,
            password: hash,
            level,
            image: image.url,
          };
          console.log(data);
          userModel
            .insertData(data)
            .then((result) => {
              res.json({
                data: result,
                message: "Insert data berhasil",
              });
            })
            .catch((err) => {
              res.json({ message: err.message });
            });
        }
      });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  login: (req, res) => {
    const { email_address, password } = req.body;
    userModel.loginUser(email_address).then((data) => {
      const userId = data.rows[0].users_id;
      const userLevel = data.rows[0].level;
      const userPassword = data.rows[0].password;
      if (data.rowCount > 0) {
        bcrypt.compare(password, userPassword).then(async (result) => {
          console.log(result);
          if (result) {
            const token = await generateToken({
              level: userLevel,
            });
            res.json({
              message: "LOGIN BERHASIL",
              generateToken: token,
              userId: userId,
              userLevel: userLevel,
            });
          } else {
            res.json({
              message: "LOGIN GAGAL",
            });
          }
        });
      }
    });
  },

  update: async (req, res) => {
    try {
      const users_id = req.params.users_id; 

      const oldData = await userModel.selectByUsers_ID(users_id);
      console.log(oldData.rowCount);
      if (!oldData.rowCount) {
        return res.json({ message: "data tidak ada" });
      }

      let image;
      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
      }else {
        image = oldData.image;
      }

      let password;
      if (req.body.password) {
        password = await bcrypt.hash(req.body.password, 10);
      } else {
        password = oldData.password; // assuming oldData has a password property
      }

      const data = {
        users_id,
        name: req.body.name || oldData.name,
        email_address: req.body.email_address || oldData.email_address,
        phone_number: req.body.phone_number || oldData.phone_number,
        password: password,
        image: image.url,
        level: req.body.level || oldData.level,
      };
      console.log(data);
      await userModel
        .updateData(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data berhasil ditambahkan",
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
  updateProfile: async (req, res) => {
    try {
      const { name } = req.body;
      const users_id = req.params.users_id;

      const { rowCount } = await userModel.selectByUsers_ID(users_id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({ message: "data tidak ada" });
      }
      let image = await cloudinary.uploader.upload(req.file.path);

      const data = { users_id, name, image: image.url };
      console.log(data);
      await userModel
        .updateProfile(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data berhasil ditambahkan",
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

  updateProfilePicture: async (req, res) => {
    try {
      const users_id = req.params.users_id;

      const { rowCount } = await userModel.selectByUsers_ID(users_id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({ message: "data tidak ada" });
      }
      let image = await cloudinary.uploader.upload(req.file.path);

      const data = { users_id, image: image.url };
      console.log(data);
      await userModel
        .updateProfilePicture(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data berhasil ditambahkan",
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
    const users_id = req.params.users_id;
    userModel
      .destroyData(users_id)
      .then((result) => {
        res.json({
          Data: result,
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

module.exports = userController;
