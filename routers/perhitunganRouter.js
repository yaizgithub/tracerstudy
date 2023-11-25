const express = require("express");

const {
    getDataset,
    getProbabilitasClass,
    getCountProbabilitasCategoriGender,
    getDatasetGroupByGender,
    getDatasetGroupByJurusan,
    getDatasetGroupByPekerjaan,
    getCountProbabilitasCategoriJurusan,
    getCountProbabilitasCategoriPekerjaan,
} = require("../controllers/perhitunganController");

const router = express.Router();

router.get("/bygender", getCountProbabilitasCategoriGender);
router.get("/byjurusan", getCountProbabilitasCategoriJurusan);
router.get("/bypekerjaan", getCountProbabilitasCategoriPekerjaan);
router.get("/dataset", getDataset);
router.get("/datasetGroupByGender", getDatasetGroupByGender);
router.get("/datasetGroupByJurusan", getDatasetGroupByJurusan);
router.get("/datasetGroupByPekerjaan", getDatasetGroupByPekerjaan);
router.get("/probabilitas-class", getProbabilitasClass);

module.exports = router;
