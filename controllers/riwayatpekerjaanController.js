const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllRiwayatPekerjaan = (req, res, next) => {
    const query = "SELECT * FROM riwayat_pekerjaan";
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

exports.getOneRiwayatPekerjaan = (req, res, next) => {
    const npm = req.params.npm;
    const query = `SELECT a.*, b.nm_pekerjaan
    , CASE 
        WHEN a.sampai_tahun is null THEN
            concat(DATE_FORMAT(a.dari_tahun,"%M %Y")," - sekarang")
        ELSE
            concat(DATE_FORMAT(a.dari_tahun,"%M %Y")," - ",DATE_FORMAT(a.sampai_tahun,"%M %Y"))
    END AS "periode"
    FROM riwayat_pekerjaan a
		LEFT JOIN
		(SELECT kd_pekerjaan, nm_pekerjaan FROM tbl_pekerjaan)b
		ON a.kd_pekerjaan = b.kd_pekerjaan
		WHERE a.npm=?`;
    koneksi.query(query, npm, (err, rows, field) => {
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

exports.postRiwayatPekerjaan = (req, res, next) => {
    const data = [
        req.body.npm,
        req.body.nama_pt,
        req.body.kd_pekerjaan,
        req.body.gaji_awal,
        req.body.dari_tahun,
        req.body.sampai_tahun,
        req.body.status_active,
        req.body.user_id,
        req.body.updator,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    const query = `INSERT INTO riwayat_pekerjaan
                        (npm, nama_pt, kd_pekerjaan,gaji_awal, dari_tahun, sampai_tahun, status_active,
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

exports.updateRiwayatPekerjaan = (req, res, next) => {
    const id = req.params.id;

    const namaPt = req.body.nama_pt;
    const kdPekerjaan = req.body.kd_pekerjaan;
    const gaji_awal = req.body.gaji_awal;
    const dariThn = req.body.dari_tahun;
    const sampaiThn = req.body.sampai_tahun;
    const statusActive = req.body.status_active;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE riwayat_pekerjaan
            SET nama_pt=?, kd_pekerjaan=?, gaji_awal=?, dari_tahun=?, sampai_tahun=?, status_active=?,  
            updator=?, updated_at=? WHERE id =?`;

    koneksi.query(
        query,
        [
            namaPt,
            kdPekerjaan,
            gaji_awal,
            dariThn,
            sampaiThn,
            statusActive,
            updator,
            updated,
            id,
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

exports.deleteRiwayatPekerjaan = (req, res, next) => {
    const id = req.params.id;

    const querySearch = "SELECT id FROM riwayat_pekerjaan WHERE id =?";
    koneksi.query(querySearch, id, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Something wrong!",
                error: err,
            });
        }

        //jika data ditemukan
        if (rows.length) {
            const query = "DELETE FROM riwayat_pekerjaan WHERE id =?";
            koneksi.query(query, id, (err, rows, field) => {
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
