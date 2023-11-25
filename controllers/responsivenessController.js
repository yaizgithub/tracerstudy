const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllResponsiveness = (req, res, next) => {
    const query = "SELECT * FROM responsiveness";
    koneksi.query(query, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }
        res.status(200).json(rows);
    });
};

exports.getOneResponsiveness = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM responsiveness WHERE nim =?";
    koneksi.query(query, nim, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }

        res.status(200).json(rows);
    });
};

exports.postResponsiveness = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.responsiveness_satu,
        req.body.responsiveness_dua,
        req.body.responsiveness_tiga,
        req.body.responsiveness_empat,
        req.body.responsiveness_lima,
        req.body.responsiveness_enam,
        req.body.responsiveness_tujuh,
        req.body.responsiveness_delapan,
        req.body.responsiveness_sembilan,
        req.body.responsiveness_sepuluh,
        req.body.user_id,
        req.body.updator,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const query = `INSERT INTO responsiveness
                        (nim, responsiveness_satu, responsiveness_dua, responsiveness_tiga, responsiveness_empat,
                            responsiveness_lima, responsiveness_enam, responsiveness_tujuh, responsiveness_delapan, 
                            responsiveness_sembilan, responsiveness_sepuluh,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    koneksi.query(query, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }
        res.status(201).json({
            status: "success",
            message: "Berhasil menyimpan data",
            data: rows,
        });
    });
};

exports.updateResponsiveness = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.responsiveness_satu;
    const dua = req.body.responsiveness_dua;
    const tiga = req.body.responsiveness_tiga;
    const empat = req.body.responsiveness_empat;
    const lima = req.body.responsiveness_lima;
    const enam = req.body.responsiveness_enam;
    const tujuh = req.body.responsiveness_tujuh;
    const delapan = req.body.responsiveness_delapan;
    const sembilan = req.body.responsiveness_sembilan;
    const sepuluh = req.body.responsiveness_sepuluh;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE responsiveness
            SET responsiveness_satu=?, responsiveness_dua=?, responsiveness_tiga=?, responsiveness_empat=?,
            responsiveness_lima=?, responsiveness_enam=?, responsiveness_tujuh=?, responsiveness_delapan=?, 
            responsiveness_sembilan=?, responsiveness_sepuluh=?,
            updator=?, updated_at=? WHERE nim =?`;

    koneksi.query(
        query,
        [
            satu,
            dua,
            tiga,
            empat,
            lima,
            enam,
            tujuh,
            delapan,
            sembilan,
            sepuluh,
            updator,
            updated,
            nim,
        ],
        (err, rows, field) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Not Found!",
                    error: err,
                });
            }
            res.status(201).json({
                status: "success",
                message: "Berhasil merubah data",
                data: rows,
            });
        }
    );
};

exports.deleteResponsiveness = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM responsiveness WHERE nim =?";
    koneksi.query(querySearch, nim, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Something wrong!",
                error: err,
            });
        }

        //jika data ditemukan
        if (rows.length) {
            const query = "DELETE FROM responsiveness WHERE nim =?";
            koneksi.query(query, nim, (err, rows, field) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Something wrong!",
                        error: err,
                    });
                }
                res.status(201).json({
                    status: "success",
                    message: "Berhasil menghapus data",
                });
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Data Not Found!",
                error: err,
            });
        }
    });
};
