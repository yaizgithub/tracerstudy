const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");
const brcypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res, next) => {
    const querySql =
        "SELECT id, role, first_name, last_name, username, jabatan, email FROM users";

    koneksi.query(querySql, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }
        res.status(200).json({ success: true, data: rows });
    });
};

exports.getUserByRole = (req, res, next) => {
    const username = req.query.username;
    const querySql =
        `SELECT id, role, username FROM users WHERE username = ?`;

    koneksi.query(querySql, username, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }

        if (rows.length > 0) {
            res.status(200).json({ success: true, message: "get data success", data: rows });

        } else {
            res.status(200).json({ success: false, message: "data not found" });
        }
    });
};

exports.userRegistrasi = async (req, res) => {
    const saltRound = 10;
    const data = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        await brcypt.hash(req.body.password, saltRound),
        req.body.username,
        req.body.role,
        req.body.jabatan,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        //   const err = Error('Invalid Value');
        //   err.errorStatus = 400;
        //   err.data = errors.array();
        //   throw err;
    }

    const querySql =
        "INSERT INTO users (first_name, last_name, email, password, username, role, jabatan, created_at, updated_at) value (?,?,?,?,?,?,?,?,?)";

    koneksi.query(querySql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage,
                // error: err,
            });
        }
        res.status(201).json({ success: true, message: "success insert data" });
    });
};

exports.userUpdate = async (req, res) => {
    // const saltRound = 10;
    const id = req.params.id;

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    // const password = await brcypt.hash(req.body.password, saltRound);
    const username = req.body.username;
    const role = req.body.role;
    const jabatan = req.body.jabatan;
    const updated = moment().format("YYYY-MM-DD HH:mm:ss");

    const querySql = `UPDATE users 
        SET first_name=?, last_name=?, email=?, username=?, role=?, jabatan=?, updated_at=? 
        WHERE id=?`;

    koneksi.query(
        querySql,
        [firstName, lastName, email, username, role, jabatan, updated, id],
        (err, rows, field) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage,
                    // error: err,
                });
            }
            res.status(200).json({
                success: true,
                message: "success update data",
            });
        }
    );
};

exports.emailLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const searchEmail = "SELECT * FROM ?? WHERE ??=?";
    const table = ["users", "email", email];
    const search = mysql.format(searchEmail, table);
    koneksi.query(search, async (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage, //"Something when wrong!",
                // error: err,
            });
        }

        //jika data ditemukan
        if (rows.length > 0) {
            const hashPassword = rows[0].password;
            const comparePassword = await brcypt.compare(
                password,
                hashPassword
            );
            // console.log(comparePassword);
            if (comparePassword) {
                const userid = rows[0].id;
                const first_name = rows[0].first_name;
                const last_name = rows[0].last_name;
                const email = rows[0].email;
                const username = rows[0].username;
                const role = rows[0].role;
                const accessToken = jwt.sign(
                    { userid, first_name, last_name, email, role, username },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "20s",
                    }
                );
                const refreshToken = jwt.sign(
                    { userid, first_name, last_name, email, role, username },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                /// set cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    /// jika menggunakan https tambahkan secure:true
                    // secure: true,
                });
                /// end set cookie

                //update data user
                const queryUpdate =
                    "UPDATE users SET refresh_token=? WHERE id = ?";
                koneksi.query(
                    queryUpdate,
                    [refreshToken, userid],
                    (err, rowUser, field) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.sqlMessage, //"Something when wrong!",
                                // error: err,
                            });
                        }
                    }
                );
                // end update data user

                return res.status(200).json({
                    success: true,
                    message: "Login success",
                    data: rows[0],
                    accessToken: accessToken,
                });
            } else {
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid Password" });
            }

            // console.log(rows.RowDataPacket.password);
        } else {
            return res
                .status(400)
                .json({ success: false, message: "email not found" });
        }
    });

    // const querySql = "UPDATE users SET ? WHERE id = ?";

    // koneksi.query(querySearch, id, (err, rows, field) => {
    //    if (err) {
    //       return res.status(500).json({
    //          success: false,
    //          message: "Something when wrong!",
    //          error: err,
    //       });
    //    }

    //    //jika datanya ada
    //    if (rows.length) {
    //       koneksi.query(querySql, [data, id], (err, rows, field) => {
    //          if (err) {
    //             return res.status(500).json({
    //                success: false,
    //                message: "Failed insert data!",
    //                error: err,
    //             });
    //          }

    //          res.status(200).json({
    //             success: true,
    //             message: "success update data",
    //          });
    //       });
    //    } else {
    //       return res.status(404).json({success:false, message:'data not found'});
    //    }
    // });
};

exports.userLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const searchUsername = "SELECT * FROM ?? WHERE ??=?";
    const table = ["users", "username", username];
    const search = mysql.format(searchUsername, table);
    koneksi.query(search, async (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage, //"Something when wrong!",
                // error: err,
            });
        }

        // ///jika data ditemukan
        // if (rows.length) {
        //     const hashPassword = rows[0].password;
        //     const comparePassword = await brcypt.compare(
        //         password,
        //         hashPassword
        //     );
        //     // console.log(comparePassword);
        //     if (comparePassword) {
        //         return res.status(200).json({
        //             success: true,
        //             message: "Login success",
        //             data: rows[0],
        //         });
        //     } else {
        //         return res
        //             .status(400)
        //             .json({ success: false, message: "Invalid Password" });
        //     }

        //     // console.log(rows.RowDataPacket.password);
        // } else {
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "username not found" });
        // }

        //jika data ditemukan
        if (rows.length > 0) {
            const hashPassword = rows[0].password;
            const comparePassword = await brcypt.compare(
                password,
                hashPassword
            );
            // console.log(comparePassword);
            if (comparePassword) {
                const userid = rows[0].id;
                const first_name = rows[0].first_name;
                const last_name = rows[0].last_name;
                const email = rows[0].email;
                const username = rows[0].username;
                const role = rows[0].role;
                const accessToken = jwt.sign(
                    { userid, first_name, last_name, email, role, username },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "20s",
                    }
                );
                const refreshToken = jwt.sign(
                    { userid, first_name, last_name, email, role, username },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                /// set cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    /// jika menggunakan https tambahkan secure:true
                    // secure: true,
                });
                /// end set cookie

                //update data user
                const queryUpdate =
                    "UPDATE users SET refresh_token=? WHERE id = ?";
                koneksi.query(
                    queryUpdate,
                    [refreshToken, userid],
                    (err, rowUser, field) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.sqlMessage, //"Something when wrong!",
                                // error: err,
                            });
                        }
                    }
                );
                // end update data user

                return res.status(200).json({
                    success: true,
                    message: "Login success",
                    data: rows[0],
                    accessToken: accessToken,
                });
            } else {
                return res
                    .status(400)
                    .json({ success: false, message: "Password salah" });
            }

            // console.log(rows.RowDataPacket.password);
        } else {
            return res
                .status(400)
                .json({ success: false, message: "nim tidak ditemukan" });
        }
    });
};

exports.userLogout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); //204 no content

    const querySql = "SELECT * FROM users WHERE refresh_token = ?";
    koneksi.query(querySql, refreshToken, (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }

        if (!rows[0]) return res.sendStatus(204); //204 no content
        const userid = rows[0].id;

        //update data user
        const queryUpdate = "UPDATE users SET refresh_token=? WHERE id = ?";
        koneksi.query(queryUpdate, [null, userid], (err, rowUser, field) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage, //"Something when wrong!",
                    // error: err,
                });
            }
            res.clearCookie("refreshToken");
            return res.sendStatus(200);
        });
        // end update data user
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    const querySearch = "SELECT * FROM users WHERE id = ?";
    const querySql = "DELETE FROM users WHERE id = ?";

    koneksi.query(querySearch, id, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Something when wrong!",
                error: err,
            });
        }

        //jika datanya ada
        if (rows.length) {
            koneksi.query(querySql, id, (err, rows, field) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "data not found!",
                        error: err,
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "success delete data",
                });
            });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "data not found" });
        }
    });
};
