const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

exports.getAllProduct = (req, res) => {
  const type = req.type;

  try {
    if (type === "buyer") {
      db.query(`select * from product `, async (err, result) => {
        if (err) res.status(400).send(err.sqlMessage);
        else {
          if (result.length == 0) {
            res.status(400).json({ message: "No rpoduct available" });
          } else {
            res.status(200).json({ ...result });
          }
        }
      });
    } else {
      res.status(400).json({ message: "only buyers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCategoryProduct = (req, res) => {
  const type = req.type;
  const { category } = req.body;

  try {
    if (type == "buyer") {
      db.query(
        `select * from product where productCategory = "${category}"`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0) {
              res
                .status(200)
                .json({ message: "no product available in this category" });
            } else {
              res.status(200).json({ ...result });
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "only buyer can get product" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.searchProduct = (req, res) => {
  const type = req.type;

  const term = req.params.searchTerm;

  try {
    if (type === "buyer") {
      db.query(
        `select * from product where productName like "${term}%" or productCategory like "${term}%"`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0) {
              res.status(200).json({ message: "No item found" });
            } else {
              res.status(200).json({ ...result });
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "only buyers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.cartProduct = (req, res) => {
  const userId = req.userId;
  const type = req.type;
  const cartId = uuidv4();
  const { productId, productCategory, productPrice, sId, productName } =
    req.body;
  try {
    if (type === "buyer") {
      db.query(
        `insert into cart (productId,productCategory,productPrice,sId,productName,cId,cartId) values ("${productId}","${productCategory}","${productPrice}","${sId}","${productName}","${userId}","${cartId}")`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlmessage);
          else {
            res.status(200).json({ message: "Product added to cart" });
          }
        }
      );
    } else {
      res.status(400).json({ message: "only buyers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.processOrder = (req, res) => {
  const userId = req.userId;
  const type = req.type;
  const orderId = uuidv4();
  let totalAmount = 0;

  try {
    if (type === "buyer") {
      db.query(
        `select * from cart where cId = "${userId}"`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0)
              res.status(400).json({ message: "No product in cart" });
            else {

              result?.forEach((element) => {
                totalAmount += element.productPrice;
                db.query(
                  `insert into orderitem (productName,productCategory,productPrice,productId,sId,cId,orderId,orderDate) values("${element.productName}","${element.productCategory}","${element.productPrice}","${element.productId}","${element.sId}","${element.cId}","${orderId}",now());`,
                  async (err, result2) => {
                    if (err) res.status(400).send(err.sqlMesaage);
                    else {
                      db.query(
                        `insert into orders (orderId,sId,cId,productId) values("${orderId}","${element.sId}","${element.cId}","${element.productId}");`,
                        async (err, result3) => {
                          if (err) res.status(400).send(err.sqlMessage);
                          else {
                            db.query(
                              `delete from cart where productId ="${element.productId}" and cId="${userId}"`,
                              async (err, result4) => {
                                if (err) res.status(400).send(err.sqlMessage);
                              }
                            );
                          }
                        }
                      );
                    }
                  
                  }
                );
              });
              res.status(200).json({
                message: "order created successfully",
                totalAmount: `total amount of order is ${totalAmount}`,
              });
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "Only buyers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteFromcart = (req, res) => {
  const userId = req.userId;
  const type = req.type;
  const { productId } = req.body;

  try {
    if (type === "buyer") {
      db.query(
        `select productName from cart where productId = "${productId}" and cId = "${userId}"`,
        async (err, result) => {
          if (err) res.status(400).send(err.sqlMessage);
          else {
            if (result.length === 0)
              res.status(400).json({ message: "product not found" });
            else {
              db.query(
                `delete from cart where productId = "${productId}" and cId="${userId}";`,
                async (err, result2) => {
                  if (err) res.status(400).send(err.sqlMessage);
                  else {
                    res
                      .status(200)
                      .json({ message: "item deleted successfully" });
                  }
                }
              );
            }
          }
        }
      );
    } else {
      res.status(400).json({ message: "only buyers are allowed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
