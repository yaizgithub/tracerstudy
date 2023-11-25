const koneksi = require("../config/database");
const dayjs = require("dayjs");
const { validationResult } = require("express-validator");

exports.getAllBerita = (req, res, next) => {
    const query = "SELECT * FROM tbl_berita";
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


exports.postBerita = (req, res, next) => {
    const data = [
        req.body.title,
        req.body.description,
        req.body.website,
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

    const query = `INSERT INTO tbl_berita
                        (title, description, website, user_id, updator, created_at, updated_at) VALUE
                        (?,?,?,?,?,?,?)`;

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

exports.updateBerita = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const id = req.params.id;

    const title = req.body.title;
    const description = req.body.description;
    const website = req.body.website;
    const updator = req.body.updator;
    const updated = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE tbl_berita
            SET title=?, description=?, website=?, updator=?, updated_at=? WHERE id =?`;

    koneksi.query(
        query,
        [
            title,
            description,
            website,
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

exports.deleteBerita = (req, res, next) => {
    const id = req.params.id;

    const querySearch = "SELECT id FROM tbl_berita WHERE id =?";
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
            const query = "DELETE FROM tbl_berita WHERE id =?";
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
