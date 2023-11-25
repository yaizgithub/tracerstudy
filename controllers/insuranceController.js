const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllInsurance = (req, res, next) => {
    const query = "SELECT * FROM insurance";
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

exports.getOneInsurance = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM insurance WHERE nim =?";
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

exports.postInsurance = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.insurance_satu,
        req.body.insurance_dua,
        req.body.insurance_tiga,
        req.body.insurance_empat,
        req.body.insurance_lima,
        req.body.insurance_enam,
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

    const query = `INSERT INTO insurance
                        (nim, insurance_satu, insurance_dua, insurance_tiga, insurance_empat,
                            insurance_lima, insurance_enam,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateInsurance = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.insurance_satu;
    const dua = req.body.insurance_dua;
    const tiga = req.body.insurance_tiga;
    const empat = req.body.insurance_empat;
    const lima = req.body.insurance_lima;
    const enam = req.body.insurance_enam;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE insurance
            SET insurance_satu=?, insurance_dua=?, insurance_tiga=?, insurance_empat=?,
            insurance_lima=?, insurance_enam=?, 
            updator=?, updated_at=? WHERE nim =?`;

    koneksi.query(
        query,
        [satu, dua, tiga, empat, lima, enam, updator, updated, nim],
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

exports.deleteInsurance = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM insurance WHERE nim =?";
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
            const query = "DELETE FROM insurance WHERE nim =?";
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
