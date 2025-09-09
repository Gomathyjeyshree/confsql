// db.js
import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",     // your DB host
  user: "root",          // your DB username
  password: "",          // your DB password
  database: "conference_dashboard", // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
