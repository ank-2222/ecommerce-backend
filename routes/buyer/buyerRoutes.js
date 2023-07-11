const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth")
const { getAllProduct, getCategoryProduct, searchProduct, cartProduct, processOrder, deleteFromcart } = require('../../controller/buyer/buyerController');

router.get("/api/buyer/getAllProduct",auth,getAllProduct);
router.post("/api/buyer/getCategoryProduct",auth,getCategoryProduct);
router.get("/api/buyer/searchterm/:searchTerm",auth,searchProduct);
router.post("/api/buyer/cart",auth,cartProduct);
router.get("/api/buyer/processOrder",auth,processOrder);
router.post("/api/buyer/deleteFromCart",auth,deleteFromcart);
module.exports = router;