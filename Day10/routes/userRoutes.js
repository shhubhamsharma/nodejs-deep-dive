const express =require("express")
const router = express.Router();

const userController = require("../controllers/userController");
const { createUser } = require("../../Day9/app/controllers/usercontroller");
const { userValidationRules, validate } = require("../middlewares/validateUser");
// const url=require('url');


router.get("/",userController.getAllUsers);
router.get("/users/:id",userController.getUserById)
router.post("/",userValidationRules(),validate,userController.createUser)
router.put("/users/:id",userValidationRules(),validate,userController.updateUser)


module.exports = router;
