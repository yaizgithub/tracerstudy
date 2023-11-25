const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllPekerjaan = (req, res, next) => {
    const query = "SELECT * FROM pekerjaan";
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

exports.getOnePekerjaan = (req, res, next) => {
    const nim = req.params.nim;
    const query = `SELECT * FROM pekerjaan WHERE nim=?`;
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

exports.postPekerjaan = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.pekerjaan_satu,
        req.body.pekerjaan_dua,
        req.body.pekerjaan_tiga,
        req.body.user_id,
        req.body.updator,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    const query = `INSERT INTO pekerjaan
                        (nim, pekerjaan_satu, pekerjaan_dua, pekerjaan_tiga,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?)`;

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

exports.updatePekerjaan = (req, res, next) => {
    const nim = req.params.nim;

    const pekerjaanSatu = req.body.pekerjaan_satu;
    const pekerjaanDua = req.body.pekerjaan_dua;
    const pekerjaanTiga = req.body.pekerjaan_tiga;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE pekerjaan
            SET pekerjaan_satu=?,  pekerjaan_dua=?, pekerjaan_tiga=?,
            updator=?, updated_at=? WHERE nim =?`;

    koneksi.query(
        query,
        [pekerjaanSatu, pekerjaanDua, pekerjaanTiga, updator, updated, nim],
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

exports.deletePekerjaan = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM pekerjaan WHERE nim =?";
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
            const query = "DELETE FROM pekerjaan WHERE nim =?";
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

exports.getPekerjaanPersentase = (req, res, next) => {
    // const query = `SELECT count(nim) 
    // into @totalSiswa
    // from pekerjaan;
    // SELECT a.id, a.pekerjaan_dua, if(a.pekerjaan_dua = "ya","Sesuai","Tidak Sesuai") as ket
    // ,@totalSiswa as totalSiswa
    // ,count(a.nim) as jumlah
    // , concat(format(count(a.nim)/@totalSiswa*100,2),"%") as persen
    // from pekerjaan a
    // GROUP BY pekerjaan_dua`;

    const query = `-- KETERANGAN
                -- kd_kategori pada riwayat_pekerjaan yang terakhir harus sama dengan
                -- kd_kategori pada jurusan alias kdKategoriJurusan
                -- jika sama berarti relevansi Sesuai
                SELECT count(id)
                into @totalSiswa
                from profile;
                
                SELECT a.id, a.npm, b.kd_kategori, c.jurusan, d.kdKategoriJurusan
                , IF(b.kd_kategori = d.kdKategoriJurusan, "Sesuai", "Tidak Sesuai") as ket
                , @totalSiswa as totalSiswa
                , count(a.npm) as jumlah
                , concat(format(count(a.npm)/@totalSiswa*100,2),"%") as persen
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
                GROUP BY IF(b.kd_kategori = d.kdKategoriJurusan, "ya", "tidak")
                ;`;
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
