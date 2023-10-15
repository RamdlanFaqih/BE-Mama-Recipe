const productModel = require("../model/product.model");
const cloudinary = require("../helper/cloudinary");
const redis = require("../config/redis");

const productController = {
  list: (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "ASC";
    productModel
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
    const allData = await productModel.selectPaginate();
    // console.log(allData);
    const totalData = Number(allData.rows[0].total);

    productModel
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

  getByRecipes_ID: (req, res) => {
    const recipes_id = req.params.recipes_id;
    productModel
      .selectByRecipes_ID(recipes_id)
      .then((result) => {
        res.send({
          data: result,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  insert: async (req, res) => {
    try {
      const { food_name, ingredients, video_title, video, comment } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = image.url;
      productModel
        .insertData(
          food_name,
          imageUrl,
          ingredients,
          video_title,
          video,
          comment
        )
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

  update: async (req, res) => {
    try {
      const  recipes_id = req.params.recipes_id;

      const oldData = (await productModel.selectByRecipes_ID(recipes_id))[0];
      
      if (!oldData) {
        return res.json({ message: "data tidak ada"});
      }
      let image;
      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
      }else {
        image = oldData.image;
      }

      const data = {
        recipes_id,
        food_name: req.body.food_name || oldData.food_name,
        ingredients: req.body.ingredients || oldData.ingredients,
        video_title: req.body.video_title || oldData.video_title,
        video: req.body.video || oldData.video,
        comment: req.body.comment || oldData.comment,
        image: image ? image.url : undefined
      };
      
      await productModel
        .updateData(data)
        .then((result) => {
          res.json({
            Data: result,
            message: "data berhasil diperbarui",
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
    const recipes_id = req.params.recipes_id;
    productModel
      .destroyData(recipes_id)
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

module.exports = productController;
