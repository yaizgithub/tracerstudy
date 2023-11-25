const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllMonev = (req, res, next) => {
    const query = "SELECT * FROM monev";
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

exports.getOneMonev = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM monev WHERE nim =?";
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

exports.postMonev = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.monev_satu,
        req.body.monev_dua,
        req.body.monev_tiga,
        req.body.monev_empat,
        req.body.monev_lima,
        req.body.monev_enam,
        req.body.monev_tujuh,
        req.body.monev_delapan,
        req.body.monev_sembilan,
        req.body.monev_sepuluh,
        req.body.saran,
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

    const query = `INSERT INTO monev
                        (nim, monev_satu, monev_dua, monev_tiga, monev_empat,
                            monev_lima, monev_enam, monev_tujuh, monev_delapan, 
                            monev_sembilan, monev_sepuluh, saran,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateMonev = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.monev_satu;
    const dua = req.body.monev_dua;
    const tiga = req.body.monev_tiga;
    const empat = req.body.monev_empat;
    const lima = req.body.monev_lima;
    const enam = req.body.monev_enam;
    const tujuh = req.body.monev_tujuh;
    const delapan = req.body.monev_delapan;
    const sembilan = req.body.monev_sembilan;
    const sepuluh = req.body.monev_sepuluh;
    const saran = req.body.saran;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE monev
            SET monev_satu=?, monev_dua=?, monev_tiga=?, monev_empat=?,
            monev_lima=?, monev_enam=?, monev_tujuh=?, monev_delapan=?,
            monev_sembilan=?, monev_sepuluh=?, saran=?,    
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
            saran,
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

exports.deleteMonev = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM monev WHERE nim =?";
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
            const query = "DELETE FROM monev WHERE nim =?";
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
