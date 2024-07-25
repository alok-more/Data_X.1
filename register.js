const express = require('express');
const mysql = require('mysql');
const app = express();



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'A_2219@ASHU',
    database: 'modbus',
});



// Set up middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//registration of new user 
app.get('/register', (req, res) => {
    res.render('registration');
});
  
app.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const checkQuery = 'SELECT * FROM access WHERE username = ?';
  const insertQuery = 'INSERT INTO access (username, password, role) VALUES (?, ?, ?)';
  
    // Check if the username already exists
    pool.query(checkQuery, [username], (err, result) => {
      if (err) {
        console.error(err);
        res.send('Error registering user');
      } else {
        if (result.length > 0) {
          // User already exists, display alert and redirect to the registration page
          res.send('<script>alert("User already exists"); window.location.href = "/register";</script>');
        } else {
          // Username doesn't exist, proceed with registration
          pool.query(insertQuery, [username, password, role], (err, result) => {
            if (err) {
              console.error(err);
              res.send('<script>alert("Error registering user"); window.location.href = "/register";</script>')
            } else {
              res.send('<script>alert("User registered successfully"); window.location.href = "/register";</script>')
            }
          });
        }
      }
    });
  });
  
module.exports = app;