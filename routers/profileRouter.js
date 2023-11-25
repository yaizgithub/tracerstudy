const express = require("express");
const {
    getOneProfile,
    updateProfile,
    updatePersenSoal,
    getProfilePersentase,
    getProfileJurusanChartPie,
    getProfileJurusanChartLine,
} = require("../controllers/profileController");
const router = express.Router();

router.get("/", getProfilePersentase);
router.get("/chart-pie", getProfileJurusanChartPie);
router.get("/chart-line/:jurusan", getProfileJurusanChartLine);
router.get("/:id", getOneProfile);
// router.put("/:id", updateProfile);
router.put("/persen-soal/:id", updatePersenSoal);

module.exports = router;
