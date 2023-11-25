const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllTangibles = (req, res, next) => {
    const query = "SELECT * FROM tangibles";
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

exports.getOneTangibles = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM tangibles WHERE nim =?";
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

exports.postTangibles = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.tangibles_satu,
        req.body.tangibles_dua,
        req.body.tangibles_tiga,
        req.body.tangibles_empat,
        req.body.tangibles_lima,
        req.body.tangibles_enam,
        req.body.tangibles_tujuh,
        req.body.tangibles_delapan,
        req.body.tangibles_sembilan,
        req.body.tangibles_sepuluh,
        req.body.tangibles_sebelas,
        req.body.tangibles_duabelas,
        req.body.tangibles_tigabelas,
        req.body.tangibles_empatbelas,
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

    const query = `INSERT INTO tangibles
                        (nim, tangibles_satu, tangibles_dua, tangibles_tiga, tangibles_empat,
                            tangibles_lima, tangibles_enam, tangibles_tujuh, tangibles_delapan, tangibles_sembilan,
                            tangibles_sepuluh, tangibles_sebelas,tangibles_duabelas,tangibles_tigabelas,tangibles_empatbelas,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateTangibles = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const satu = req.body.tangibles_satu;
    const dua = req.body.tangibles_dua;
    const tiga = req.body.tangibles_tiga;
    const empat = req.body.tangibles_empat;
    const lima = req.body.tangibles_lima;
    const enam = req.body.tangibles_enam;
    const tujuh = req.body.tangibles_tujuh;
    const delapan = req.body.tangibles_delapan;
    const sembilan = req.body.tangibles_sembilan;
    const sepuluh = req.body.tangibles_sepuluh;
    const sebelas = req.body.tangibles_sebelas;
    const duabelas = req.body.tangibles_duabelas;
    const tigabelas = req.body.tangibles_tigabelas;
    const empatbelas = req.body.tangibles_empatbelas;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE tangibles
            SET tangibles_satu=?, tangibles_dua=?, tangibles_tiga=?, tangibles_empat=?,
            tangibles_lima=?, tangibles_enam=?, tangibles_tujuh=?, tangibles_delapan=?, tangibles_sembilan=?,
            tangibles_sepuluh=?, tangibles_sebelas=?, tangibles_duabelas=?, tangibles_tigabelas=?, tangibles_empatbelas=?,
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
            sebelas,
            duabelas,
            tigabelas,
            empatbelas,
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

exports.deleteTangibles = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM tangibles WHERE nim =?";
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
            const query = "DELETE FROM tangibles WHERE nim =?";
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
