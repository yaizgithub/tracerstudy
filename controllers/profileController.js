const koneksi = require("../config/database");
const moment = require("moment");
const { validationResult } = require("express-validator");

exports.getProfilePersentase = (req, res, next) => {
    const query = `SELECT count(id) 
    into @totalSiswa
    from profile;
    
    SELECT a.id, a.gender, if(a.gender = 1,"Laki-laki","Perempuan") ket  
    ,@totalSiswa as totalSiswa
    ,count(a.id) as jumlah
    , concat(format(count(a.id)/@totalSiswa*100,2),"%") as persen
    from profile a
    GROUP BY gender`;
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

exports.getProfileJurusanChartPie = (req, res, next) => {
    const query = `SELECT count(id) 
    into @totalSiswa
    from profile;
    
    SELECT a.id, a.jurusan  
    ,@totalSiswa as totalSiswa
    ,count(a.id) as jumlah
    , concat(format(count(a.id)/@totalSiswa*100,2),"%") as persen
    from profile a
    GROUP BY jurusan`;
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


// exports.getProfileJurusanChartLine = (req, res, next) => {
//     const jurusan = req.params.jurusan;
//     const query = `SELECT id, jurusan , date_format(tgl_masuk, '%Y') as tahun
//     , count(jurusan) as jumlah
//     from profile
//     where jurusan =?
//     GROUP BY jurusan, date_format(tgl_masuk, '%Y')`;
//     koneksi.query(query, jurusan, (err, rows, field) => {
//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Not Found!",
//                 error: err,
//             });
//         }
//         res.status(200).json(rows);
//     });
// };

exports.getProfileJurusanChartLine = (req, res, next) => {
    const jurusan = req.params.jurusan;
    const query = `SELECT id, jurusan , date_format(thn_masuk, '%Y') as tahun
                    , count(jurusan) as jumlah
                    from profile
                    where jurusan =?
                    GROUP BY jurusan, date_format(thn_masuk, '%Y')`;
    koneksi.query(query, jurusan, (err, rows, field) => {
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

exports.getOneProfile = (req, res, next) => {
    const id = req.params.id;
    const query = "SELECT * FROM profile WHERE id =?";
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


// exports.updateProfile = (req, res, next) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     //    const errors = validationResult(req);
//     //    if (!errors.isEmpty()) {
//     //       return res.status(400).json({ errors: errors.array() });
//     //    }

//     const id = req.params.id;

//     const firstName = req.body.first_name;
//     const lastName = req.body.last_name;
//     const alamat = req.body.alamat;
//     const tglLahir = req.body.tgl_lahir;
//     const noHp = req.body.no_hp;
//     const persenSoal = req.body.persen_soal;
//     const updator = req.body.updator;
//     const updated = moment().format("YYYY-MM-DD HH:mm:ss");

//     const query = `UPDATE profile
//                   SET first_name=?, last_name = ?, alamat=?, tgl_lahir=?, no_hp=?, persen_soal=?, updator=?, updated_at=? WHERE id =?`;

//     koneksi.query(
//         query,
//         [
//             firstName,
//             lastName,
//             alamat,
//             tglLahir,
//             noHp,
//             persenSoal,
//             updator,
//             updated,
//             id,
//         ],
//         (err, rows, field) => {
//             if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Not Found!",
//                     error: err,
//                 });
//             }
//             res.status(201).json({
//                 status: "success",
//                 message: "Berhasil merubah data",
//                 data: rows,
//             });
//         }
//     );
// };

exports.updatePersenSoal = (req, res, next) => {
    const id = req.params.id;

    const persenSoal = req.body.persen_soal;

    const query = `UPDATE profile
                  SET persen_soal=? WHERE id =?`;

    koneksi.query(query, [persenSoal, id], (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Not Found!",
                error: err,
            });
        }
        res.status(201).json({
            status: "success",
            message: "Berhasil merubah persen soal",
            data: rows,
        });
    });
};


