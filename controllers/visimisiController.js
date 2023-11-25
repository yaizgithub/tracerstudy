const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllVisimisi = (req, res, next) => {
    const query = "SELECT * FROM visimisi";
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

exports.getOneVisimisi = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM visimisi WHERE nim =?";
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

exports.postVisimisi = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.visimisi_satu,
        req.body.visimisi_dua,
        req.body.visimisi_tiga,
        req.body.visimisi_empat,
        req.body.visimisi_lima,
        req.body.visimisi_enam,
        req.body.visimisi_tujuh,
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

    const query = `INSERT INTO visimisi
                        (nim, visimisi_satu, visimisi_dua, visimisi_tiga, visimisi_empat,
                            visimisi_lima, visimisi_enam, visimisi_tujuh,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateVisimisi = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.visimisi_satu;
    const dua = req.body.visimisi_dua;
    const tiga = req.body.visimisi_tiga;
    const empat = req.body.visimisi_empat;
    const lima = req.body.visimisi_lima;
    const enam = req.body.visimisi_enam;
    const tujuh = req.body.visimisi_tujuh;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE visimisi
            SET visimisi_satu=?, visimisi_dua=?, visimisi_tiga=?, visimisi_empat=?,
            visimisi_lima=?, visimisi_enam=?, visimisi_tujuh=?, 
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

exports.deleteVisimisi = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM visimisi WHERE nim =?";
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
            const query = "DELETE FROM visimisi WHERE nim =?";
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
