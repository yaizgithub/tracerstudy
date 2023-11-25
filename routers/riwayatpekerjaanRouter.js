const express = require("express");
const {
    getAllRiwayatPekerjaan,
    getOneRiwayatPekerjaan,
    postRiwayatPekerjaan,
    updateRiwayatPekerjaan,
    deleteRiwayatPekerjaan,
} = require("../controllers/riwayatpekerjaanController");

const router = express.Router();

router.get("/", getAllRiwayatPekerjaan);
router.get("/:npm", getOneRiwayatPekerjaan);
router.post("/", postRiwayatPekerjaan);
router.put("/:id", updateRiwayatPekerjaan);
router.delete("/:id", deleteRiwayatPekerjaan);

module.exports = router;
