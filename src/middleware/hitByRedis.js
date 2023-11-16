// const client = require("../config/redis");

// const hitbyID = async (req, res, next) => {
//     const idUser = req.params.id;
//     try {
//         const user = await client.get(`getFromRedis/${idUser}`);
//         console.log(user);
//         if (user) {
//             let result = JSON.parse(user);
//             res.send({
//                 fromCache: true,
//                 data: result
//             });
//         }
//         else {
//             next();
//         }
//     }
//     catch (err) {
//         console.error(err.message);
//         req.status(404);
//     }
// };

// module.exports = {
//     hitbyID
// };
