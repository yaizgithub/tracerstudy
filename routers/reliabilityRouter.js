const express = require("express");
const {
    getAllReliability,
    getOneReliability,
    postReliability,
    updateReliability,
    deleteReliability,
} = require("../controllers/reliabilityController");

const router = express.Router();

router.get("/", getAllReliability);
router.get("/:nim", getOneReliability);
router.post("/", postReliability);
router.put("/:nim", updateReliability);
router.delete("/:nim", deleteReliability);

module.exports = router;
