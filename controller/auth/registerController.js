const express = require("express");
const db = require("../../database/db");
require("dotenv").config({ path: "../config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateId = (email, timestamp) => {
  const mail = email.split("@");
  const id = mail[0] + timestamp;
  return id;
};

exports.register = async (req, res) => {
  const { fname, lname, email, password, type } = req.body;
  const timestamp = new Date().valueOf();

  try {
    if (!fname || !lname || !email || !password || !type) {
      res.status(400).send("All Input required!!");
    } else {
      db.query(
        `select * from user where email = "${email}" `,
        async (err, result) => {
          if (err) {
            // console.log("res-> ", err);
            res.status(400).send(err.sqlMessage);
          } else {
            if (result.length == 0) {
              //   bcrypt.genSalt(10, function(err, salt) {
              //     bcrypt.hash(password, salt, function(err, hash) {
              //      encryptedPassword = hash;
              //      console.log("hash->",hash);
              //     });
              // });

              var encryptedPassword = await bcrypt.hashSync(password, 10);
              const id = generateId(email, timestamp);

              db.query(
                `insert into user (uId,fname,lname,email,password,type,createdAt) values ("${id}","${fname}","${lname}","${email}","${encryptedPassword}","${type}", now())`,
                async (err, result2) => {
                  if (err) {
                    // console.log("res2-> ", err);
                    res.status(400).send(err.sqlMessage);
                  } else {
                    db.query(
                      `select * from user where email = "${email}"`,
                      async (err, result3) => {
                        if (err) {
                          // console.log(err);
                          res.status(400).send(err.sqlMessage);
                        } else {
                          // console.log(result3);

                          const token = jwt.sign(
                            {
                              id: result3[0].uId,
                              email,
                              type,
                            },
                            process.env.TOKEN_KEY,
                            {
                              expiresIn: "48h",
                            }
                          );
                          // console.log(token);
                          res.status(200).send(token);
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.status(201).json({
                message: "user Already exists!!",
              });
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
