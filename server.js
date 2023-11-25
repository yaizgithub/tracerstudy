const express = require("express");

const tokenRouter = require("./routers/tokenRouter");
const usersRouter = require("./routers/usersRouter");
const profileRouter = require("./routers/profileRouter");
const reliabilityRouter = require("./routers/reliabilityRouter");
const tangiblesRouter = require("./routers/tangiblesRouter");
const responsivenessRouter = require("./routers/responsivenessRouter");
const empathyRouter = require("./routers/empathyRouter");
const insuranceRouter = require("./routers/insuranceRouter");
const visimisiRouter = require("./routers/visimisiRouter");
const monevRouter = require("./routers/monevRouter");
const waktululusRouter = require("./routers/waktululusRouter");
const riwayatpekerjaanRouter = require("./routers/riwayatpekerjaanRouter");
const pekerjaanRouter = require("./routers/pekerjaanRouter");
const usermenuRouter = require("./routers/usermenuRouter");
const beritaRouter = require("./routers/beritaRouter");
const alumniRouter = require("./routers/alumniRouter");
const jurusanRouter = require("./routers/jurusanRouter");
const masterpekerjaanRouter = require("./routers/masterpekerjaanRouter");
const perhitunganRouter = require("./routers/perhitunganRouter");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// LD_LIBRARY_PATH = "/usr/local/lib64/:$LD_LIBRARY_PATH";

/// cors policy
// var allowedOrigins = [
//     "http://192.168.1.11:3000",
//     // "http://192.168.1.11:3000",
//     // "http://192.168.1.111:3000",
//     // "http://192.168.1.114:3000",
//     // "http://192.168.1.115:3000",
//     "http://localhost:3000",
//     // "http://localhost:3001",
//     // "http://192.168.88.95:3000",
//     // "http://192.168.1.100:3000",
//     // "http://192.168.1.102:3000",
// ];
var allowedOrigins = [
    "https://tracerstudy.gg-ssp.com",
    "https://tracerstudyuhm.gg-ssp.com",
    //"http://192.168.1.116:3000",
    //"http://localhost:3000",
    // "http://localhost:3001",
    // "http://192.168.77.187:3001",
    // "http://192.168.77.187:3000",
    // "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);
/// end cors

// app.use(cors());

// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-type"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//         );
//         res.header(
//             "Access-Control-Allow-Methods",
//             "GET, POST, PUT, DELETE, PATCH"
//         );
//         return res.status(200).json({});
//     }
//     next();
// });

app.use(cookieParser());
app.use(express.json()); //agar input req body via json pada postman bisa diterima
app.use(express.urlencoded()); //agar input req body via x-www-form-urlencoded pada postman bisa diterima

process.env.TZ = "Asia/Makassar"; // UTC +00:00
console.log(new Date().toString());

//ROUTER

app.use("/api/users", usersRouter);
app.use("/api/token", tokenRouter);
app.use("/api/profile", profileRouter);
app.use("/api/reliability", reliabilityRouter);
app.use("/api/tangibles", tangiblesRouter);
app.use("/api/responsiveness", responsivenessRouter);
app.use("/api/empathy", empathyRouter);
app.use("/api/insurance", insuranceRouter);
app.use("/api/visimisi", visimisiRouter);
app.use("/api/monev", monevRouter);
app.use("/api/waktu-lulus", waktululusRouter);
app.use("/api/riwayat-pekerjaan", riwayatpekerjaanRouter);
app.use("/api/pekerjaan", pekerjaanRouter);
app.use("/api/usermenu", usermenuRouter);

// router admin
app.use("/api/berita", beritaRouter);
app.use("/api/alumni", alumniRouter);
app.use("/api/jurusan", jurusanRouter);
app.use("/api/masterpekerjaan", masterpekerjaanRouter);
app.use("/api/perhitungan", perhitunganRouter);
// end router admin

//END ROUTER

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
