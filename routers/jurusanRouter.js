const express = require("express");
const {
    getJurusan,
    postJurusan,
    updateJurusan,
    deleteJurusan,
} = require("../controllers/jurusanController");

const router = express.Router();

router.get("/", getJurusan);
router.post("/", postJurusan);
router.put("/:kd_jurusan", updateJurusan);
router.delete("/:kd_jurusan", deleteJurusan);

module.exports = router;
