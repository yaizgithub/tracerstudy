const express = require("express");
const {
    getAllWaktululus,
    getOneWaktululus,
    postWaktululus,
    updateWaktululus,
    deleteWaktululus,
    getWaktululusChartPie,
} = require("../controllers/waktululusController");

const router = express.Router();

router.get("/", getAllWaktululus);
router.get("/chart-pie", getWaktululusChartPie);
router.get("/:nim", getOneWaktululus);
router.post("/", postWaktululus);
router.put("/:nim", updateWaktululus);
router.delete("/:nim", deleteWaktululus);

module.exports = router;
