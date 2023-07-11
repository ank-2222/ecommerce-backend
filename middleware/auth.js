const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });
//const db = require("../database/db");

const verifyToken = (req, res, next) => {
  //  console.log(req.headers['auth-token']);
  const token =
    req.body.token || req.headers["auth-token"] || req.query.token;

  if (!token) {
    return res
      .status(400)
      .json({ error: "Token is required for authentication" });
  } else {
    try {
      var decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = decoded.id;
      req.type = decoded.type;
     
      //to get uid in request url later
    } catch (error) {
      return res.status(400).json({ message: "Invalid Token Id!!" });
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With",
      "Content-Type",
      "x-access-token"
    );
    
    return next();
  }
};

module.exports = verifyToken;








// db.query(
//     `select * from user where uId ="${uId}"`,
//     async (err, result) => {
//       if (err) {
//         res.status(400).send(err.sqlmessage);
//       } else {
//         if (result.length === 0) {
//           return res.status(400).json({ message: "user Invalid" });
//         } else {
//           req.userId = decoded.id;
      
//         }
//       }
//     }
//   );