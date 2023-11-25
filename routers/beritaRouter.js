const express = require("express");
const {
    getAllEmpathy,
    getOneEmpathy,
    postEmpathy,
    updateEmpathy,
    deleteEmpathy,
} = require("../controllers/empathyController");
const { getAllBerita, postBerita, updateBerita, deleteBerita } = require("../controllers/beritaController");

const router = express.Router();

router.get("/", getAllBerita);
router.post("/", postBerita);
router.put("/:id", updateBerita);
router.delete("/:id", deleteBerita);

module.exports = router;
