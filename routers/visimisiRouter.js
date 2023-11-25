const express = require("express");
const { getAllVisimisi, getOneVisimisi, postVisimisi, updateVisimisi, deleteVisimisi } = require("../controllers/visimisiController");


const router = express.Router();

router.get("/", getAllVisimisi);
router.get("/:nim", getOneVisimisi);
router.post("/", postVisimisi);
router.put("/:nim", updateVisimisi);
router.delete("/:nim", deleteVisimisi);

module.exports = router;
