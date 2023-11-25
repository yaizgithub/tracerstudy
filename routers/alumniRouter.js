const express = require("express");
const {
    getAllEmpathy,
    getOneEmpathy,
    postEmpathy,
    updateEmpathy,
    deleteEmpathy,
} = require("../controllers/empathyController");
const { getAllAlumni, postAlumni, updateAlumni, deleteAlumni, getOneAlumni } = require("../controllers/alumniController");

const router = express.Router();

router.get("/", getAllAlumni);
router.get("/:id", getOneAlumni);
router.post("/", postAlumni);
router.put("/:id", updateAlumni);
router.delete("/:id", deleteAlumni);

module.exports = router;
