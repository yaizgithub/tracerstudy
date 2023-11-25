const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getAllUserMenu = (req, res, next) => {
    const query = "SELECT * FROM user_menu";
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

exports.getOneUserMenu = (req, res, next) => {
    const nim = req.params.nim;
    const query = "SELECT * FROM user_menu WHERE nim =?";
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

exports.getMenuUser = (req, res, next) => {
    const nim = req.params.nim;
    const kategori = req.params.kategori;
    const query = `SELECT id,nim,label,kunci as "key",kategori FROM user_menu WHERE nim =? AND kategori=?`;
    koneksi.query(query, [nim, kategori], (err, rows, field) => {
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

exports.postUserMenu = (req, res, next) => {
    const data = [
        req.body.nim,
        req.body.label,
        req.body.kunci,
        req.body.kategori,
        req.body.user_id,
        req.body.updator,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    const query = `INSERT INTO user_menu
                        (nim, label, kunci, kategori, user_id, updator, created_at, updated_at) VALUE
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

exports.updateUserMenu = (req, res, next) => {
    const nim = req.params.nim;

    const label = req.body.label;
    const key = req.body.kunci;
    const kategori = req.body.kategori;
    const updator = req.body.updator;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const query = `UPDATE user_menu
            SET label=?, kunci=?, kategori=?,
            updator=?, updated_at=? WHERE nim =?`;

    koneksi.query(
        query,
        [label, kunci, kategori, updator, updated, nim],
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

exports.deleteUserMenu = (req, res, next) => {
    const id = req.params.id;

    const querySearch = "SELECT id FROM user_menu WHERE id =?";
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
            const query = "DELETE FROM user_menu WHERE id =?";
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

///khusus daftar menu (nebeng controller ki)
exports.getMenus = (req, res, next) => {
    const query = `SELECT id,label,kunci as "key", kategori FROM menus `;
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
