const koneksi = require("../config/database");

exports.getJurusan = (req, res, next) => {
    const query = "SELECT * FROM tbl_jurusan";
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

exports.postJurusan = (req, res, next) => {
    const data = [
        req.body.kd_jurusan,
        req.body.nm_jurusan,
        req.body.kd_kategori,
    ];

    const query = `INSERT INTO tbl_jurusan
                        (kd_jurusan, nm_jurusan, kd_kategori) VALUE
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

exports.updateJurusan = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const kd_jurusan = req.params.kd_jurusan;

    const nm_jurusan = req.body.nm_jurusan;
    const kd_kategori = req.body.kd_kategori;

    const query = `UPDATE tbl_jurusan
            SET nm_jurusan=?, kd_kategori=? WHERE kd_jurusan =?`;

    koneksi.query(
        query,
        [nm_jurusan, kd_kategori, kd_jurusan],
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

exports.deleteJurusan = (req, res, next) => {
    const kd_jurusan = req.params.kd_jurusan;

    const querySearch =
        "SELECT kd_jurusan FROM tbl_jurusan WHERE kd_jurusan =?";
    koneksi.query(querySearch, kd_jurusan, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Something wrong!",
                error: err,
            });
        }

        //jika data ditemukan
        if (rows.length) {
            const query = "DELETE FROM tbl_jurusan WHERE kd_jurusan =?";
            koneksi.query(query, kd_jurusan, (err, rows, field) => {
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
