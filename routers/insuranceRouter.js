const express = require("express");
const {
    getAllInsurance,
    getOneInsurance,
    postInsurance,
    updateInsurance,
    deleteInsurance,
} = require("../controllers/insuranceController");

const router = express.Router();

router.get("/", getAllInsurance);
router.get("/:nim", getOneInsurance);
router.post("/", postInsurance);
router.put("/:nim", updateInsurance);
router.delete("/:nim", deleteInsurance);

module.exports = router;
