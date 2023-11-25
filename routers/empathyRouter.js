const express = require("express");
const {
    getAllEmpathy,
    getOneEmpathy,
    postEmpathy,
    updateEmpathy,
    deleteEmpathy,
} = require("../controllers/empathyController");

const router = express.Router();

router.get("/", getAllEmpathy);
router.get("/:nim", getOneEmpathy);
router.post("/", postEmpathy);
router.put("/:nim", updateEmpathy);
router.delete("/:nim", deleteEmpathy);

module.exports = router;
