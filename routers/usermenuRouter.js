const express = require("express");
const {
    getAllUserMenu,
    getOneUserMenu,
    postUserMenu,
    updateUserMenu,
    deleteUserMenu,
    getMenus,
    getMenuUser,
} = require("../controllers/usermenuControl");

const router = express.Router();

router.get("/", getAllUserMenu);
router.get("/menus", getMenus);
router.get("/:nim", getOneUserMenu);
router.get("/:nim/:kategori", getMenuUser);
router.post("/", postUserMenu);
router.put("/:nim", updateUserMenu);
router.delete("/:id", deleteUserMenu);

module.exports = router;
