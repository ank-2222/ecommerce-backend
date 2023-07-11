const express = require("express");
const db = require("../../database/db");
require("dotenv").config({ path: "../config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send("All fields required!!");
    } else {
      db.query(
        `select * from user where email = "${email}"`,
        async (err, result) => {
          if (err) {
            // console.log(err);
            res.status(400).send(err.sqlMessage);
          } else {
            if (result.length != 0) {
            //   console.log(result);

            //   console.log(result[0]["password"]);
            //   console.log(
            //     "pass comparision-> ",
            //     bcrypt.compareSync(password, result[0].password)
            //   );

              //   let passComp;
              //   bcrypt.compare(password.toString(), result[0].password).then((res) => {
              //     // res === true
              //     passComp = res;
              // });

              if (bcrypt.compareSync(password, result[0].password)) {
                const token = jwt.sign(
                  {
                    id: result[0].uId,
                    email,
                    type:result[0].type
                  },
                  process.env.TOKEN_KEY,
                  { expiresIn: "48h" }
                );

                res.status(200).json({
                  token,
                  message: "user Logged in",
                });
              } else {
                res.status(400).json({ error: "Invalid Password" });
              }
            } else {
              res.status(400).send("User doesn't exist");
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
