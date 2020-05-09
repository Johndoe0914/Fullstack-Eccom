const express = require("express");
const router = express.Router();
const { create, read, categoryById, update, remove,list} = require("../controllers/category");

const {requireSignin, isAuth, isAdmin} = require("../controllers/auth")
const { userById} = require("../controllers/user")

//Grab single category
router.get('/category/:categoryId', read)
//Add single category
router.post('/category/create/:userId' ,requireSignin, isAdmin, isAuth , create);
//Update single category
router.put('/category/:categoryId/:userId' ,requireSignin, isAdmin, isAuth , update);
//Delete single category
router.delete('/category/:categoryId/:userId' ,requireSignin, isAdmin, isAuth , remove);
//Get all categories
router.get('/categories', list)

//Grabs category ID 
router.param("categoryId", categoryById);
//Grabs user ID
router.param("userId", userById)

module.exports = router;