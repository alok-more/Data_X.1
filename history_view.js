// const express = require('express');
// const debug = require('debug')('modbus');
// const mysql = require('mysql');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const fs = require('fs');


// const app = express();

// // DB settings
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'A_2219@ASHU',
//   database: 'modbus',
// };

// // MySQL connection pool
// const pool = mysql.createPool(dbConfig);

// // Serve the HTML form for timestamp input
// app.get('/history_view', (req, res) => {
//   res.send(`
//     <html>
//     <head>
//       <title>History View</title>
//       <link rel="stylesheet" type="text/css" href="styles.css">
//     </head>
//     <body>
//       <form action="/fetch_data" method="get">
//         <label for="start">Start Timestamp:</label>
//         <input type="text" id="start" name="start" placeholder="YYYY-MM-DD HH:MM:SS" required><br>
//         <label for="end">End Timestamp:</label>
//         <input type="text" id="end" name="end" placeholder="YYYY-MM-DD HH:MM:SS" required><br>
//         <input type="submit" value="Fetch Data">
//       </form>
//     </body>
//     </html>
//   `);
// });




// app.get('/fetch_data', (req, res) => {
//   const { start, end } = req.query; // Retrieve start and end timestamps from query parameters

//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//     res.send('Invalid timestamp format');
//     return;
//   }

//   pool.getConnection((err, connection) => {
//     if (err) {
//       debug('Database connection error:', err);
//       res.send('Error connecting to the database');
//       return;
//     }

//     const selectQuery = 'SELECT * FROM data_logs WHERE timestamp >= ? AND timestamp <= ?';
//     const queryParams = [startDate, endDate];

//     connection.query(selectQuery, queryParams, (error, results) => {
//       connection.release();

//       if (error) {
//         debug('Database select error:', error);
//         res.send('Error fetching data from the database');
//         return;
//       }

//       const chartData = results.map(row => ({
//         timestamp: row.timestamp,
//         value1: row.value1,
//         value2: row.value2,
//         value3: row.value3,
//         value4: row.value4,
//         value5: row.value5,
//         value6: row.value6,
//         value7: row.value7,
//         value8: row.value8,
//       }));

//       res.send(`
//         <canvas id="chart"></canvas>
//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           function createLineChart(data) {
//             const labels = data.map(row => row.timestamp);
//             const datasets = [
//               {
//                 label: 'Value 1',
//                 data: data.map(row => row.value1),
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 2',
//                 data: data.map(row => row.value2),
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 3',
//                 data: data.map(row => row.value3),
//                 backgroundColor: 'rgba(255, 206, 86, 0.2)',
//                 borderColor: 'rgba(255, 206, 86, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 4',
//                 data: data.map(row => row.value4),
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 5',
//                 data: data.map(row => row.value5),
//                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                 borderColor: 'rgba(153, 102, 255, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 6',
//                 data: data.map(row => row.value6),
//                 backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                 borderColor: 'rgba(255, 159, 64, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 7',
//                 data: data.map(row => row.value7),
//                 backgroundColor: 'rgba(0, 204, 102, 0.2)',
//                 borderColor: 'rgba(0, 204, 102, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//               {
//                 label: 'Value 8',
//                 data: data.map(row => row.value8),
//                 backgroundColor: 'rgba(128, 128, 128, 0.2)',
//                 borderColor: 'rgba(128, 128, 128, 1)',
//                 borderWidth: 1,
//                 fill: false,
//                 pointRadius: 0,
//                 pointHoverRadius: 0,
//               },
//             ];

//             const ctx = document.getElementById('chart').getContext('2d');
//             new Chart(ctx, {
//               type: 'line',
//               data: {
//                 labels: labels,
//                 datasets: datasets,
//               },
//               options: {
//                 responsive: true,
//                 scales: {
//                   x: {
//                     display: true,
//                     title: {
//                       display: true,
//                       text: 'Timestamp',
//                     },
//                   },
//                   y: {
//                     display: true,
//                     title: {
//                       display: true,
//                       text: 'Value',
//                     },
//                   },
//                 },
//               },
//             });
//           }

//           createLineChart(${JSON.stringify(chartData)});
//         </script>
//       `);
//     });
//   });
// });



// // Code for exporting data to a CSV file
// app.post('/export_data', (req, res) => {
//   const { start, end } = req.body; // Retrieve start and end timestamps from the form data

//   // Validate and parse the timestamps
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//     res.send('Invalid timestamp format');
//     return;
//   }

//   // Select data within the specified time interval from the database
//   pool.getConnection((err, connection) => {
//     if (err) {
//       debug('Database connection error:', err);
//       res.send('Error connecting to the database');
//       return;
//     }

//     const selectQuery = 'SELECT * FROM data_logs WHERE timestamp >= ? AND timestamp <= ?';
//     const queryParams = [startDate, endDate];

//     connection.query(selectQuery, queryParams, (error, results) => {
//       connection.release(); // Release the connection back to the pool

//       if (error) {
//         debug('Database select error:', error);
//         res.send('Error fetching data from the database');
//         return;
//       }

//       // Define CSV file path
//       const csvFilePath = 'data.csv';

//       // Define CSV writer
//       const csvWriter = createCsvWriter({
//         path: csvFilePath,
//         header: [
//           { id: 'timestamp', title: 'Timestamp' },
//           { id: 'value1', title: 'Value 1' },
//           { id: 'value2', title: 'Value 2' },
//           { id: 'value3', title: 'Value 3' },
//           { id: 'value4', title: 'Value 4' },
//           { id: 'value5', title: 'Value 5' },
//           { id: 'value6', title: 'Value 6' },
//           { id: 'value7', title: 'Value 7' },
//           { id: 'value8', title: 'Value 8' },
//         ],
//       });

//       // Write data to CSV file
//       csvWriter
//         .writeRecords(results)
//         .then(() => {
//           // Send the CSV file as a download
//           res.download(csvFilePath, 'data.csv', err => {
//             if (err) {
//               debug('CSV file download error:', err);
//               res.send('Error downloading CSV file');
//             }

//             // Delete the CSV file
//             fs.unlink(csvFilePath, deleteError => {
//               if (deleteError) {
//                 debug('CSV file deletion error:', deleteError);
//               }
//             });
//           });
//         })
//         .catch(writeError => {
//           debug('CSV file write error:', writeError);
//           res.send('Error exporting data to CSV file');
//         });
//     });
//   });
// });

// module.exports = app;




const express = require('express');
const debug = require('debug')('modbus');
const mysql = require('mysql');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');


const app = express();

// DB settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'A_2219@ASHU',
  database: 'modbus',
};

// MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Serve the HTML form for timestamp input
app.get('/history_view', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>History View</title>
      <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
      <form action="/fetch_data" method="get">
        <label for="start">Start Timestamp:</label>
        <input type="text" id="start" name="start" placeholder="YYYY-MM-DD HH:MM:SS" required><br>
        <label for="end">End Timestamp:</label>
        <input type="text" id="end" name="end" placeholder="YYYY-MM-DD HH:MM:SS" required><br>
        <input type="submit" value="Fetch Data">
      </form>
    </body>
    </html>
  `);
});

// Code for fetching data based on the provided timestamps
app.get('/fetch_data', (req, res) => {
  const { start, end } = req.query; // Retrieve start and end timestamps from query parameters

  // Validate and parse the timestamps
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    res.send('Invalid timestamp format');
    return;
  }

  // Select data within the specified time interval from the database
  pool.getConnection((err, connection) => {
    if (err) {
      debug('Database connection error:', err);
      res.send('Error connecting to the database');
      return;
    }

    const selectQuery = 'SELECT * FROM data_logs WHERE timestamp >= ? AND timestamp <= ?';
    const queryParams = [startDate, endDate];

    connection.query(selectQuery, queryParams, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        debug('Database select error:', error);
        res.send('Error fetching data from the database');
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
        <form action="/export_data" method="post">
          <input type="hidden" name="start" value="${start}">
          <input type="hidden" name="end" value="${end}">
          <input type="submit" value="Export Data">
        </form>
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
      `;

      // Send data response
      res.send(table);
    });
  });
});

// Code for exporting data to a CSV file
app.post('/export_data', (req, res) => {
  const { start, end } = req.body; // Retrieve start and end timestamps from the form data

  // Validate and parse the timestamps
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    res.send('Invalid timestamp format');
    return;
  }

  // Select data within the specified time interval from the database
  pool.getConnection((err, connection) => {
    if (err) {
      debug('Database connection error:', err);
      res.send('Error connecting to the database');
      return;
    }

    const selectQuery = 'SELECT * FROM data_logs WHERE timestamp >= ? AND timestamp <= ?';
    const queryParams = [startDate, endDate];

    connection.query(selectQuery, queryParams, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        debug('Database select error:', error);
        res.send('Error fetching data from the database');
        return;
      }

      // Define CSV file path
      const csvFilePath = 'data.csv';

      // Define CSV writer
      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'timestamp', title: 'Timestamp' },
          { id: 'value1', title: 'Value 1' },
          { id: 'value2', title: 'Value 2' },
          { id: 'value3', title: 'Value 3' },
          { id: 'value4', title: 'Value 4' },
          { id: 'value5', title: 'Value 5' },
          { id: 'value6', title: 'Value 6' },
          { id: 'value7', title: 'Value 7' },
          { id: 'value8', title: 'Value 8' },
        ],
      });

      // Write data to CSV file
      csvWriter
        .writeRecords(results)
        .then(() => {
          // Send the CSV file as a download
          res.download(csvFilePath, 'data.csv', err => {
            if (err) {
              debug('CSV file download error:', err);
              res.send('Error downloading CSV file');
            }

            // Delete the CSV file
            fs.unlink(csvFilePath, deleteError => {
              if (deleteError) {
                debug('CSV file deletion error:', deleteError);
              }
            });
          });
        })
        .catch(writeError => {
          debug('CSV file write error:', writeError);
          res.send('Error exporting data to CSV file');
        });
    });
  });
});

module.exports=app;