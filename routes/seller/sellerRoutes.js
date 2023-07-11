const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth")
const sellerController = require("../../controller/seller/sellerController");

router.get("/api/seller/getAllProduct",auth,sellerController.getAllProduct);
router.post("/api/seller/addProduct",auth,sellerController.addProduct);
router.post("/api/seller/deleteProduct",auth,sellerController.deleteProduct);
router.post("/api/seller/updateProduct",auth,sellerController.updateProduct);
router.get("/api/seller/getOrder",auth,sellerController.getOrder);



module.exports = router;