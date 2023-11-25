const koneksi = require("../config/database");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const querySql = "SELECT * FROM users WHERE refresh_token = ?";
        koneksi.query(querySql, refreshToken, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Not Found!",
                    error: err,
                });
            }

            if (!rows[0]) return res.sendStatus(403);

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) return res.sendStatus(403);
                    const userid = rows[0].id;
                    const first_name = rows[0].first_name;
                    const last_name = rows[0].last_name;
                    const email = rows[0].email;
                    const username = rows[0].username;
                    const role = rows[0].role;
                    const accessToken = jwt.sign(
                        {
                            userid,
                            first_name,
                            last_name,
                            email,
                            role,
                            username,
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "15s",
                        }
                    );
                    res.json({ accessToken: accessToken });
                }
            );
        });
    } catch (error) {
        console.log(error);
    }
};
