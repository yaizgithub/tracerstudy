const express = require("express");
const {
    getAllTangibles,
    getOneTangibles,
    postTangibles,
    updateTangibles,
    deleteTangibles,
} = require("../controllers/tangiblesController");

const router = express.Router();

router.get("/", getAllTangibles);
router.get("/:nim", getOneTangibles);
router.post("/", postTangibles);
router.put("/:nim", updateTangibles);
router.delete("/:nim", deleteTangibles);

module.exports = router;
