const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getWaktululusChartPie = (req, res, next) => {
    // const query = `SELECT count(id)
    //               into @totalSiswa
    //               from profile;

    //               SELECT id, DATE_FORMAT(tgl_pengambilan_ijazah,"%M %Y") as tglAmbilIjazah
    //               , DATE_FORMAT(thn_masuk_kerja,"%M %Y") as tglBekerja
    //               , TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) as selisih
    //               , CASE
    //                   WHEN TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) >=0 AND TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) <= 2 THEN
    //                       "0 s/d 2 bulan"
    //                       WHEN TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) >2 AND TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) <= 6 THEN
    //                       "6 s/d 7 bulan"
    //                       WHEN TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) >6 AND TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) <= 12 THEN
    //                       "7 s/d 12 bulan"
    //                       WHEN TIMESTAMPDIFF(month, tgl_pengambilan_ijazah, thn_masuk_kerja) >12 THEN
    //                       "diatas 12 bulan"
    //                   ELSE
    //                     "Bekerja duluan"
    //               END as klasifikasi
    //               , concat(format(count(id)/@totalSiswa*100,2),"%") as persen
    //               , count(id) as jumlah
    //               from profile
    //               GROUP BY klasifikasi
    //               ORDER BY selisih`;

    const query = `SELECT count(id) 
                  into @totalSiswa
                  from profile;
                  
                  SELECT a.id, DATE_FORMAT(a.tgl_pengambilan_ijazah,"%M %Y") as tglAmbilIjazah
                  , DATE_FORMAT(b.dari_tahun,"%M %Y") as tglBekerja
                  , TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) as selisih
                  , CASE 
                      WHEN TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) >=0 AND TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) <= 2 THEN
                          "0 s/d 2 bulan"
                          WHEN TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) >2 AND TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) <= 6 THEN
                          "6 s/d 7 bulan"
                          WHEN TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) >6 AND TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) <= 12 THEN
                          "7 s/d 12 bulan"
                          WHEN TIMESTAMPDIFF(month, a.tgl_pengambilan_ijazah, b.dari_tahun) >12 THEN
                          "diatas 12 bulan"
                      ELSE
                        "Bekerja duluan"
                  END as klasifikasi
                  , concat(format(count(a.id)/@totalSiswa*100,2),"%") as persen
                  , count(id) as jumlah
                  from profile a
                  LEFT JOIN
                  (SELECT npm, dari_tahun from riwayat_pekerjaan
                  GROUP BY npm)b
                  ON a.id = b.npm
                  GROUP BY klasifikasi
                  ORDER BY selisih`;

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

exports.getAllWaktululus = (req, res, next) => {
    const query = "SELECT * FROM waktu_lulus";
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

exports.getOneWaktululus = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM waktu_lulus WHERE nim =?";
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

exports.postWaktululus = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.tgl_masuk,
        req.body.tgl_lulus,
        req.body.tgl_ambilijazah,
        req.body.tgl_bekerja,
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

    const query = `INSERT INTO waktu_lulus
                        (nim, tgl_masuk, tgl_lulus, tgl_ambilijazah, tgl_bekerja,
                            user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?)`;

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

exports.updateWaktululus = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const nim = req.params.nim;

    const tglMasuk = req.body.tgl_masuk;
    const tglLulus = req.body.tgl_lulus;
    const tglIjazah = req.body.tgl_ambilijazah;
    const tglBekerja = req.body.tgl_bekerja;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE waktu_lulus
            SET tgl_masuk=?, tgl_lulus=?, tgl_ambilijazah=?, tgl_bekerja=?,  
            updator=?, updated_at=? WHERE nim =?`;

    koneksi.query(
        query,
        [tglMasuk, tglLulus, tglIjazah, tglBekerja, updator, updated, nim],
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

exports.deleteWaktululus = (req, res, next) => {
    const nim = req.params.nim;

    const querySearch = "SELECT nim FROM waktu_lulus WHERE nim =?";
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
            const query = "DELETE FROM waktu_lulus WHERE nim =?";
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
