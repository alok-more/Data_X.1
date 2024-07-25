const express = require('express');
const ModbusRTU = require('modbus-serial');
const debug = require('debug')('modbus');
const mysql = require('mysql');

const app = express();
const client = new ModbusRTU();

// Communication parameters
const baudRate = 9600;
const parity = 'even';
const dataBits = 8;

// DB settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'A_2219@ASHU',
  database: 'modbus',
};

// MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Route to display all data from the database
app.get('/all_data', (req, res) => {
  // Select all data from the database
  pool.getConnection((err, connection) => {
    if (err) {
      debug('Database connection error:', err);
      res.json({ success: false, error: err.message });
      return;
    }

    const selectQuery = 'SELECT * FROM data_logs';

    connection.query(selectQuery, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        debug('Database select error:', error);
        res.json({ success: false, error: error.message });
        return;
      }

      // Display data in table format
      const tableRows = results
        .map(
          row =>
            `<tr><td>${row.timestamp}</td><td>${row.value1}</td><td>${row.value2}</td><td>${row.value3}</td><td>${row.value4}</td><td>${row.value5}</td><td>${row.value6}</td><td>${row.value7}</td><td>${row.value8}</td></tr>`
        )
        .join('');
      const table = `
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border: 1px solid black;">
            <th style="border: 1px solid black; padding: 8px;">Timestamp</th>
            <th style="border: 1px solid black; padding: 8px;">Value 1</th>
            <th style="border: 1px solid black; padding: 8px;">Value 2</th>
            <th style="border: 1px solid black; padding: 8px;">Value 3</th>
            <th style="border: 1px solid black; padding: 8px;">Value 4</th>
            <th style="border: 1px solid black; padding: 8px;">Value 5</th>
            <th style="border: 1px solid black; padding: 8px;">Value 6</th>
            <th style="border: 1px solid black; padding: 8px;">Value 7</th>
            <th style="border: 1px solid black; padding: 8px;">Value 8</th>
          </tr>
          ${tableRows}
        </table>
        <br>
        <form action="/">
          <button type="submit">Current Data</button>
        </form>
      `;

      // Send data response
      res.send(table);
    });
  });
});

// // Refresh page after 10 sec
// app.use((req, res, next) => {
//   res.setHeader('Refresh', '10');
//   next();
// });

module.exports = app;
