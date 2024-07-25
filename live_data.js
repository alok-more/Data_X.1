// const express = require('express');
// const ModbusRTU = require('modbus-serial');
// const debug = require('debug')('modbus');
// const mysql = require('mysql');
// const ejs = require('ejs');

// const app = express();
// const client = new ModbusRTU();

// // Communication parameters
// const baudRate = 9600;
// const parity = 'even';
// const dataBits = 8;

// // DB settings
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'A_2219@ASHU',
//   database: 'modbus',
// };

// // MySQL connection pool
// const pool = mysql.createPool(dbConfig);



// app.get('/current_datalog', (req, res) => {
//   const getData = () => {
//     // Open serial ports with specified parameters
//     client.connectRTUBuffered('COM9', { baudRate, parity, dataBits }, () => {
//       debug('Serial port connected');

//       // Read holding registers
//       const startAddress = 3; // Starting address
//       const quantity = 8; // Number of registers

//       client
//         .readHoldingRegisters(startAddress, quantity)
//         .then((data) => {
//           debug('Read data:', data.data);

//           // Format values to decimal points
//           const formattedData = data.data.map((value) => (value * 0.1).toFixed(2));

//           // Create an object with formatted values
//           const formattedValues = {};
//           for (let i = 0; i < formattedData.length; i++) {
//             formattedValues[`Value ${i + 1}`] = formattedData[i];
//           }

//           // Store data in the database
//           pool.getConnection((err, connection) => {
//             if (err) {
//               debug('Database connection error:', err);
//               renderDashboard({ error: err.message, data: formattedValues });
//               return;
//             }

//             // Queries to insert values in the database
//             const insertQuery =
//               'INSERT INTO data_logs (timestamp, value1, value2, value3, value4, value5, value6, value7, value8) VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?)';
//             const insertValues = [
//               formattedData[0],
//               formattedData[1],
//               formattedData[2],
//               formattedData[3],
//               formattedData[4],
//               formattedData[5],
//               formattedData[6],
//               formattedData[7],
//             ];

//             connection.query(insertQuery, insertValues, (error, results) => {
//               connection.release(); // Release the connection back to the pool

//               if (error) {
//                 debug('Database insert error:', error);
//                 renderDashboard({ error: error.message, data: formattedValues });
//                 return;
//               }

//               renderDashboard({ error: null, data: formattedValues });
//             });
//           });
//         })
//         .catch((err) => {
//           debug('Read error:', err);
//           const errorMessage = err.message || 'Device is not connected';
//           const blankValues = { 'Value 1': '', 'Value 2': '', 'Value 3': '', 'Value 4': '', 'Value 5': '', 'Value 6': '', 'Value 7': '', 'Value 8': '' };
//           renderDashboard({ error: errorMessage, data: blankValues });
//         })
//         .finally(() => {
//           // Close serial port
//           client.close(() => {
//             debug('Serial port closed');
//           });
//         });
//     });
//   };

//   const renderDashboard = (data) => {
//     ejs.renderFile(__dirname + '/views/live.ejs', data, (err, html) => {
//       if (err) {
//         res.status(500).send('Error rendering dashboard');
//       } else {
//         res.send(html);
//       }
//     });
//   };

//   getData();




//   app.get('/all_data', (req, res) => {
//     // Select all data from the database
//     pool.getConnection((err, connection) => {
//       if (err) {
//         debug('Database connection error:', err);
//         res.json({ success: false, error: err.message });
//         return;
//       }
  
//       const selectQuery = 'SELECT * FROM data_logs';
  
//       connection.query(selectQuery, (error, results) => {
//         connection.release(); // Release the connection back to the pool
  
//         if (error) {
//           debug('Database select error:', error);
//           res.json({ success: false, error: error.message });
//           return;
//         }
  
//         // Display data in table format
//         const tableRows = results
//           .map(
//             row =>
//               `<tr><td>${row.timestamp}</td><td>${row.value1}</td><td>${row.value2}</td><td>${row.value3}</td><td>${row.value4}</td><td>${row.value5}</td><td>${row.value6}</td><td>${row.value7}</td><td>${row.value8}</td></tr>`
//           )
//           .join('');
//         const table = `
//           <table style="border-collapse: collapse; width: 100%;">
//             <tr style="border: 1px solid black;">
//               <th style="border: 1px solid black; padding: 8px;">Timestamp</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 1</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 2</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 3</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 4</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 5</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 6</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 7</th>
//               <th style="border: 1px solid black; padding: 8px;">Value 8</th>
//             </tr>
//             ${tableRows}
//           </table>
//           <br>
//           <form action="/current_datalog">
//             <button type="submit">Current Data</button>
//           </form>
//         `;
  
//         // Send data response
//         res.send(table);
//       });
//     });
//   });
  
//   // // Refresh page after 10 seconds
//   // app.use((req, res, next) => {
//   //   res.setHeader('Refresh', '10');
//   //   next();
//   // });
  
//   // module.exports = app;

//   // Auto refresh after 10 seconds
//   // const refreshInterval = setInterval(getData, 10000);

//   // // Stop auto-refresh after 10 minutes
//   // setTimeout(() => {
//   //   clearInterval(refreshInterval);
//   // }, 600000);
// });
//  module.exports = app;





const express = require('express');
const ModbusRTU = require('modbus-serial');
const debug = require('debug')('modbus');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
const client = new ModbusRTU();

// DB settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'A_2219@ASHU',
  database: 'modbus',
};


// MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Fetch communication settings from the database
const fetchCommunicationSettings = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        debug('Database connection error:', err);
        reject(err);
      } else {
        const selectQuery = 'SELECT comPort, baudRate, parity, stopBits FROM communication_settings WHERE id = 1';
        connection.query(selectQuery, (error, results) => {
          connection.release(); // Release the connection back to the pool

          if (error) {
            debug('Database select error:', error);
            reject(error);
          } else {
            if (results.length > 0) {
              const { comPort, baudRate, parity, stopBits } = results[0];
              resolve({ comPort, baudRate, parity, stopBits });
            } else {
              reject(new Error('No communication settings found in the database.'));
            }
          }
        });
      }
    });
  });
};

const getData = (res) => {
  fetchCommunicationSettings()
    .then(({ comPort, baudRate, parity, stopBits }) => {
      // Open serial ports with specified parameters
      client.connectRTUBuffered(comPort, { baudRate, parity, stopBits }, () => {
        debug('Serial port connected');

        // Read holding registers
        const startAddress = 3; // Starting address
        const quantity = 8; // Number of registers

        client
          .readHoldingRegisters(startAddress, quantity)
          .then((data) => {
            debug('Read data:', data.data);

            // Format values to decimal points
            const formattedData = data.data.map((value) => (value * 0.1).toFixed(2));

            // Create an object with formatted values
            const formattedValues = {};
            for (let i = 0; i < formattedData.length; i++) {
              formattedValues[`Value ${i + 1}`] = formattedData[i];
            }

            // Store data in the database
            pool.getConnection((err, connection) => {
              if (err) {
                debug('Database connection error:', err);
                renderDashboard(res, { error: err.message, data: formattedValues });
                return;
              }

              // Queries to insert values in the database
              const insertQuery =
                'INSERT INTO data_logs (timestamp, value1, value2, value3, value4, value5, value6, value7, value8) VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?)';
              const insertValues = [
                formattedData[0],
                formattedData[1],
                formattedData[2],
                formattedData[3],
                formattedData[4],
                formattedData[5],
                formattedData[6],
                formattedData[7],
              ];

              connection.query(insertQuery, insertValues, (error, results) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                  debug('Database insert error:', error);
                  renderDashboard(res, { error: error.message, data: formattedValues });
                  return;
                }

                renderDashboard(res, { error: null, data: formattedValues });
              });
            });
          })
          .catch((err) => {
            debug('Read error:', err);
            const errorMessage = err.message || 'Device is not connected';
            const blankValues = {
              'Value 1': '',
              'Value 2': '',
              'Value 3': '',
              'Value 4': '',
              'Value 5': '',
              'Value 6': '',
              'Value 7': '',
              'Value 8': '',
            };
            renderDashboard(res, { error: errorMessage, data: blankValues });
          })
          .finally(() => {
            // Close serial port
            client.close(() => {
              debug('Serial port closed');
            });
          });
      });
    })
    .catch((error) => {
      debug('Communication settings error:', error);
      const errorMessage = error.message || 'Error retrieving communication settings from the database';
      const blankValues = {
        'Value 1': '',
        'Value 2': '',
        'Value 3': '',
        'Value 4': '',
        'Value 5': '',
        'Value 6': '',
        'Value 7': '',
        'Value 8': '',
      };
      renderDashboard(res, { error: errorMessage, data: blankValues });
    });
};

const renderDashboard = (res, data) => {
  ejs.renderFile(__dirname + '/views/live.ejs', data, (err, html) => {
    if (err) {
      res.status(500).send('Error rendering dashboard');
    } else {
      res.send(html);
    }
  });
};

app.get('/current_datalog', (req, res) => {
  getData(res);
});

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

      // Display data in table formatx
      const tableRows = results
        .map(
          (row) =>
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
        <form action="/current_datalog">
          <button type="submit">Current Data</button>
        </form>
      `;

      // Send data response
      res.send(table);
    });
  });
});

module.exports = app;
