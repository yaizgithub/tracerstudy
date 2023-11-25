const express = require("express");
const {
    getAllPekerjaan,
    getOnePekerjaan,
    postPekerjaan,
    updatePekerjaan,
    deletePekerjaan,
    getPekerjaanPersentase,
} = require("../controllers/pekerjaanController");

const router = express.Router();

router.get("/", getAllPekerjaan);
router.get("/persentase", getPekerjaanPersentase);
router.get("/:nim", getOnePekerjaan);
router.post("/", postPekerjaan);
router.put("/:nim", updatePekerjaan);
router.delete("/:nim", deletePekerjaan);

module.exports = router;
