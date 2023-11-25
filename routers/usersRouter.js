const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
    getAllUsers,
    userRegistrasi,
    userLogin,
    emailLogin,
    userLogout,
    userUpdate,
    deleteUser,
    getUserByRole,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

const validateRegistrasi = [
    body("email").isEmail().withMessage("Invalid email format"),
    // body("username").isLength({ min: 2 }).withMessage("Nama minimal 2 karakter"),
];
const validateLogin = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 2 })
        .withMessage("Password minimal 2 karakter"),
];

router.get("/", getAllUsers);
router.get("/orderbyrole", getUserByRole);
router.post("/register", userRegistrasi);
router.put("/update/:id", userUpdate);
router.post("/login-user", userLogin);
router.post("/login-email", validateLogin, emailLogin);
router.delete("/logout", userLogout);
router.delete("/:id", deleteUser);

module.exports = router;
