const db = require("../../database/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.getAllProduct = (req, res) => {
  const userId = req.userId;
  const type = req.type;
  try {
    if (type === "seller") {
      db.query(
        `select * from product where sId = "${userId}"`,

        async (err, result) => {
          if (err) {
            res.status(400).sned(err.sqlMessage);
          } else {
            if (result.length === 0) {
              res.status(200).json({ message: "No Product available" });
            } else {
              res.status(200).json({ ...result });
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "Only seller are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addProduct = (req, res) => {
  const userId = req.userId;
  const type = req.type;
  const { productName, productCategory, productPrice } = req.body;

  //     console.log(userId);
  try {
    if (type === "seller") {
      const productId = uuidv4();
      // console.log(productId);
      db.query(
        `insert into product (productId,productCategory,productPrice,sId,productName) values ("${productId}","${productCategory}","${productPrice}","${userId}","${productName}")`,
        async (err, result) => {
          if (err) {
            res.status(400).send(err.sqlMessage);
          } else {
            res.status(200).json({ message: "Product added successfully" });
          }
        }
      );
    } else {
      res.status(400).json({ message: "only seller can add product" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProduct = (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  const type = req.type;
  try {
    if (type === "seller") {
      db.query(
        `select productName from product where productId = "${productId}" and sId = "${userId}"`,
        async (err, result) => {
          if (err) {
            res.status(400).send(err.sqlMessage);
          } else {
            if (result.length === 0) {
              res
                .status(400)
                .json({ message: "No product of this Id has been found" });
            } else {
              db.query(
                `Delete from product where productId = "${productId}"`,
                async (err, result2) => {
                  if (err) res.status(400).send(err.sqlMessage);
                  else {
                    res
                      .status(200)
                      .json({ message: "Product deleted Successfully" });
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "Only seller can delete product" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateProduct = (req, res) => {
  const userId = req.userId;
  const { productId, productName, productCategory, productPrice } = req.body;
  const type = req.type;

  try {
    if (type === "seller") {
      db.query(
        `select productName from product where productId ="${productId}" and sId ="${userId}"`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0) {
              res.status(400).json("Product not found");
            } else {
              db.query(
                `update product set productCategory ="${productCategory}", productPrice ="${productPrice}", productName = "${productName}" where productId = "${productId}" and uId ="${userId}"`,
                async (err, result2) => {
                  if (err) res.status(400).send(err.sqlMessage);
                  else {
                    res
                      .status(200)
                      .json({ message: "Product updated successfully" });
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "Only seller can update Item" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};



exports.getOrder = (req, res) => {
  const userId = req.userId;
  const type = req.type;

  try {
    if (type === "seller") {
      db.query(
        `select * from orders where sId = "${userId}" `,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0) {
              res.status(200).json({ message: "no orders yet" });
            } else {
              db.query(
                `select product.productId, product.productName, product.productPrice, product.productCategory,product.sId, orders.orderId  from product inner join orders on product.productId = orders.productId`,
                async (err, result2) => {
                  if (err) res.status(400).send(err.sqlMessage);
                  else {
                    res
                      .status(200)
                      .json({ message: "Order details", ...result2 });
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "only sellers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
