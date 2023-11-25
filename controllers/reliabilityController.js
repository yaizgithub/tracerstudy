const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllReliability = (req, res, next) => {
    const query = "SELECT * FROM reliability";
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

exports.getOneReliability = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM reliability WHERE nim =?";
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

exports.postReliability = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.reliability_satu,
        req.body.reliability_dua,
        req.body.reliability_tiga,
        req.body.reliability_empat,
        req.body.reliability_lima,
        req.body.reliability_enam,
        req.body.reliability_tujuh,
        req.body.reliability_delapan,
        req.body.reliability_sembilan,
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

    const query = `INSERT INTO reliability
                        (nim, reliability_satu, reliability_dua, reliability_tiga, reliability_empat,
                            reliability_lima, reliability_enam, reliability_tujuh, reliability_delapan, reliability_sembilan,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateReliability = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.reliability_satu;
    const dua = req.body.reliability_dua;
    const tiga = req.body.reliability_tiga;
    const empat = req.body.reliability_empat;
    const lima = req.body.reliability_lima;
    const enam = req.body.reliability_enam;
    const tujuh = req.body.reliability_tujuh;
    const delapan = req.body.reliability_delapan;
    const sembilan = req.body.reliability_sembilan;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE reliability
            SET reliability_satu=?, reliability_dua=?, reliability_tiga=?, reliability_empat=?,
            reliability_lima=?, reliability_enam=?, reliability_tujuh=?, reliability_delapan=?, reliability_sembilan=?,
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

exports.deleteReliability = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM reliability WHERE nim =?";
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
            const query = "DELETE FROM reliability WHERE nim =?";
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
