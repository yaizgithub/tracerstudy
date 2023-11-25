const koneksi = require("../config/database");
const dayjs = require("dayjs");
const { validationResult } = require("express-validator");

exports.getAllAlumni = (req, res, next) => {
    const query = `SELECT *, IF(gender = 1,"Laki-laki","Perempuan") as jnsKel
                    FROM profile`;
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

exports.getOneAlumni = (req, res, next) => {

    const id = req.params.id;

    const query = "SELECT * FROM profile WHERE id = ?";
    koneksi.query(query, id, (err, rows, field) => {
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


exports.postAlumni = (req, res, next) => {
    const data = [
        req.body.id,
        req.body.first_name,
        req.body.last_name,
        req.body.tgl_lahir,
        req.body.tempat_lahir,
        req.body.jurusan,
        req.body.thn_masuk,
        req.body.thn_lulus,
        req.body.tgl_pengambilan_ijazah,
        req.body.ipk,
        req.body.alamat,
        req.body.no_hp,
        req.body.gender,
        req.body.user_id,
        req.body.updator,
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
    ];

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const query = `INSERT INTO profile
                        (id, first_name, last_name, tgl_lahir, tempat_lahir, jurusan, thn_masuk, thn_lulus
                            , tgl_pengambilan_ijazah, ipk
                            , alamat, no_hp, gender
                            , user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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

exports.updateAlumni = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const id = req.params.id;

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const tgl_lahir = req.body.tgl_lahir;
    const tempat_lahir = req.body.tempat_lahir;
    const jurusan = req.body.jurusan;
    const thn_masuk = req.body.thn_masuk;
    const thn_lulus = req.body.thn_lulus;
    const tgl_pengambilan_ijazah = req.body.tgl_pengambilan_ijazah;
    const ipk = req.body.ipk;
    const alamat = req.body.alamat;
    const no_hp = req.body.no_hp;
    const gender = req.body.gender;
    const updator = req.body.updator;
    const updated = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE profile
            SET first_name=?, last_name=?, tgl_lahir=?, tempat_lahir=?, jurusan=?, thn_masuk=?, thn_lulus=?
            , tgl_pengambilan_ijazah=?, ipk=?
            , alamat=?, no_hp=?, gender=?
            , updator=?, updated_at=? WHERE id =?`;

    koneksi.query(
        query,
        [
            first_name,
            last_name,
            tgl_lahir,
            tempat_lahir,
            jurusan,
            thn_masuk,
            thn_lulus,
            tgl_pengambilan_ijazah,
            ipk,
            alamat,
            no_hp,
            gender,
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

exports.deleteAlumni = (req, res, next) => {
    const id = req.params.id;

    const querySearch = "SELECT id FROM profile WHERE id =?";
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
            const query = "DELETE FROM profile WHERE id =?";
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
