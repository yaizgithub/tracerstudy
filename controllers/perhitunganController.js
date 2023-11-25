const koneksi = require("../config/database");

const { validationResult } = require("express-validator");

exports.getDataset = (req, res, next) => {
    const query = `SELECT * from view_dataset`;
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

exports.getDatasetGroupByGender = (req, res, next) => {
    const query = `SELECT gender from view_dataset GROUP BY gender`;
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

exports.getDatasetGroupByJurusan = (req, res, next) => {
    const query = `SELECT jurusan from view_dataset GROUP BY jurusan`;
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

exports.getDatasetGroupByPekerjaan = (req, res, next) => {
    const query = `SELECT kd_pekerjaan from view_dataset GROUP BY kd_pekerjaan`;
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

exports.getProbabilitasClass = (req, res, next) => {
    const query = `SELECT count(npm)
    into @totalSiswa 
    from (SELECT count(npm) as npm
    from riwayat_pekerjaan
    GROUP BY npm) as A;
                    
                    SELECT a.id, a.npm, b.kd_kategori, c.jurusan, d.kdKategoriJurusan
                    , IF(b.kd_kategori = d.kdKategoriJurusan, "Ya", "Tidak") as ket
                    , @totalSiswa as totalSiswa
                    , count(a.npm) as jumlah
                    , concat(format(count(a.npm)/@totalSiswa,2),"%") as persen
                    from riwayat_pekerjaan a
                    LEFT JOIN
                    (SELECT kd_pekerjaan, nm_pekerjaan, kd_kategori 
                    from tbl_pekerjaan)b
                    on a.kd_pekerjaan = b.kd_pekerjaan
                    LEFT JOIN
                    (SELECT id, first_name, jurusan
                    FROM profile)c
                    ON a.npm = c.id
                    LEFT JOIN
                    (SELECT kd_jurusan, nm_jurusan, kd_kategori as kdKategoriJurusan
                    from tbl_jurusan)d
                    on c.jurusan = d.kd_jurusan
                    LEFT JOIN 
                    (select * from riwayat_pekerjaan) e
                    ON a.npm = e.npm 
                    AND a.id < e.id
                    WHERE e.id IS NULL
                    GROUP BY IF(b.kd_kategori = d.kdKategoriJurusan, "Ya", "Tidak")
                    ;`;
    koneksi.query(query, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }
        res.status(200).json(rows[1]);
    });
};

exports.getCountProbabilitasCategoriGender = (req, res, next) => {
    const gender = req.query.gender;
    const relevansi = req.query.relevansi;

    const query = `SELECT count(npm) as count from view_dataset
                where gender=? and relevansi=?`;
    koneksi.query(query, [gender, relevansi], (err, rows, field) => {
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

exports.getCountProbabilitasCategoriJurusan = (req, res, next) => {
    const jurusan = req.query.jurusan;
    const relevansi = req.query.relevansi;

    const query = `SELECT count(npm) as count from view_dataset
                where jurusan=? and relevansi=?`;
    koneksi.query(query, [jurusan, relevansi], (err, rows, field) => {
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

exports.getCountProbabilitasCategoriPekerjaan = (req, res, next) => {
    const kd_pekerjaan = req.query.kd_pekerjaan;
    const relevansi = req.query.relevansi;

    const query = `SELECT count(npm) as count from view_dataset
                where kd_pekerjaan=? and relevansi=?`;
    koneksi.query(query, [kd_pekerjaan, relevansi], (err, rows, field) => {
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
