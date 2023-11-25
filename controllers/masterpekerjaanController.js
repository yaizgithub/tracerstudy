const koneksi = require("../config/database");
const moment = require("moment");

exports.getMasterPekerjaan = (req, res, next) => {
    const query = "SELECT * FROM tbl_pekerjaan";
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

exports.postMasterPekerjaan = (req, res, next) => {
    const data = [
        req.body.kd_pekerjaan,
        req.body.nm_pekerjaan,
        req.body.kd_kategori,
    ];

    const query = `INSERT INTO tbl_pekerjaan
                        (kd_pekerjaan, nm_pekerjaan, kd_kategori) VALUE
                        (?,?,?)`;

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

exports.updateMasterPekerjaan = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const kd_pekerjaan = req.params.kd_pekerjaan;

    const nm_pekerjaan = req.body.nm_pekerjaan;
    const kd_kategori = req.body.kd_kategori;

    const query = `UPDATE tbl_pekerjaan
            SET nm_pekerjaan=?, kd_kategori=? WHERE kd_pekerjaan =?`;

    koneksi.query(
        query,
        [nm_pekerjaan, kd_kategori, kd_pekerjaan],
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

exports.deleteMasterPekerjaan = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch =
        "SELECT kd_pekerjaan FROM tbl_pekerjaan WHERE kd_pekerjaan =?";
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
            const query = "DELETE FROM tbl_pekerjaan WHERE kd_pekerjaan =?";
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
