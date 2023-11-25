const express = require("express");
const {
    getAllResponsiveness,
    getOneResponsiveness,
    postResponsiveness,
    updateResponsiveness,
    deleteResponsiveness,
} = require("../controllers/responsivenessController");

const router = express.Router();

router.get("/", getAllResponsiveness);
router.get("/:nim", getOneResponsiveness);
router.post("/", postResponsiveness);
router.put("/:nim", updateResponsiveness);
router.delete("/:nim", deleteResponsiveness);

module.exports = router;
