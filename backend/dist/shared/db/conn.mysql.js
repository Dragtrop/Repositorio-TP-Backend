import mysql from "mysql2/promise";
export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_HOST || 'root',
    password: process.env.DB_HOST || 'elrayo',
    database: process.env.DB_HOST || 'cocheras',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
//# sourceMappingURL=conn.mysql.js.map