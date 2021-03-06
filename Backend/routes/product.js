const express = require("express");
const router = express.Router();


const {requireSignin, isAuth, isAdmin} = require("../controllers/auth")
const { userById } = require("../controllers/user")
const { productById, read, remove, update, create, list, listRelated, listCategories, listBySearch, listSearch , photo} = require("../controllers/product")

router.post('/product/create/:userId' ,requireSignin ,isAdmin, isAuth ,create);
router.get("/product/:productId", read)
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth , remove)
router.put("/product/:productId/:userId", requireSignin, isAdmin, isAuth , update)
router.get("/products", list)
router.get("/products/search", listSearch)
router.get("/products/related/:productId", listRelated)
router.get("/products/categories", listCategories)
router.post("/products/by/search", listBySearch)
router.get("/product/photo/:productId", photo)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router;