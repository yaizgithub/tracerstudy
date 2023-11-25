const express = require("express");
const { getAllMonev, getOneMonev, postMonev, updateMonev, deleteMonev } = require("../controllers/monevController");



const router = express.Router();

router.get("/", getAllMonev);
router.get("/:nim", getOneMonev);
router.post("/", postMonev);
router.put("/:nim", updateMonev);
router.delete("/:nim", deleteMonev);

module.exports = router;
