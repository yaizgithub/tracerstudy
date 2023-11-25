const express = require("express");

const {
    getMasterPekerjaan,
    postMasterPekerjaan,
    updateMasterPekerjaan,
    deleteMasterPekerjaan,
} = require("../controllers/masterpekerjaanController");

const router = express.Router();

router.get("/", getMasterPekerjaan);
router.post("/", postMasterPekerjaan);
router.put("/:kd_pekerjaan", updateMasterPekerjaan);
router.delete("/:kd_pekerjaan", deleteMasterPekerjaan);

module.exports = router;
