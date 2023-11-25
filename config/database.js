const mysql = require("mysql");

// ///configurasi  mysql
// const koneksi = mysql.createConnection({
//     // connectionLimit:10,
//     host: "apitracerstudy.gg-ssp.com",
//     user: "u1038204_niagahoster",
//     password: "tambak.jie321",
//     database: "u1038204_coba_tracer_study",
//     multipleStatements: true,
//     //port:'3306',
// });

///configurasi  mysql
const koneksi = mysql.createConnection({
    // connectionLimit:10,
    host: "127.0.0.1",
    user: "root",
    password: "adming",
    database: "db_tracer_study",
    multipleStatements: true,
    //port:'3306',
});

/// log error koneksi
koneksi.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...");
});

module.exports = koneksi;
