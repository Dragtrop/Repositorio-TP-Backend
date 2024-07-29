import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host:process.env.DB_HOST || 'localhost',
    user:process.env.DB_HOST || 'dsw',
    password:process.env.DB_HOST || 'dsw',
    database:process.env.DB_HOST || 'cocheras',
    waitForConnections:true,
    connectionLimit:10,
    maxIdle: 10,
    idleTimeout:60000,
    queueLimit:0,
    enableKeepAlive: true,
    keepAliveInitialDelay:0,
}) 