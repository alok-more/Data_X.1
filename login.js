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



// Store the logged-in status, role, and password in memory
let isLoggedIn = false;
let role = '';
let password = '';



// Login route
app.get('/', (req, res) => {
  if (isLoggedIn) {
    redirectToDashboard(res);
  } else {
    res.set('Cache-Control', 'no-store');// Set no-store cache directive
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.render('login');
  }
});


app.post('/login', (req, res) => {
  const { username, password: enteredPassword } = req.body;
  const query = 'SELECT * FROM access WHERE username = ? AND password = ?';
  pool.query(query, [username, enteredPassword], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      isLoggedIn = true;
      role = results[0].role;
      password = enteredPassword;
      redirectToDashboard(res);
    } else {
      res.send('<script>alert("Invalid username or password."); window.location.href = "/";</script>');
    }
  });  
});





// Dashboard route
app.get('/dashboard', (req, res) => {
  if (isLoggedIn) {
    res.set('Cache-Control', 'no-cache'); // Set no-cache cache directive
    if (role === 'admin') {
      res.render('admin-dashboard');
    } else {
      // Handle unknown roles
      res.send('Unknown role');
    }
    } else {
    res.redirect('/');
  }
});
app.get('/operator-dashboard', (req, res) => {
  if (isLoggedIn && role === 'operator') {
    res.set('Cache-Control', 'no-cache'); // Set no-cache cache directive
    res.render('operator-dashboard');
  } else {
    res.redirect('/');
  }
});





// Logout route
app.get('/logout', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.render('logout');
});

app.post('/logout', (req, res) => {
  const { password: enteredPassword } = req.body;
  if (enteredPassword === password) {
    // Clear the logged-in status, role, and password
    isLoggedIn = false;
    role = '';
    password = '';
    res.send('/');
  } else {
    res.send('<script>alert("Invalid password."); window.location.href = "/logout";</script>');
  }
});




function redirectToDashboard(res) {
  if (role === 'admin') {
    res.redirect('/dashboard');
  } else if (role === 'operator') {
    res.redirect('/operator-dashboard');
  } else {
    // Handle unknown roles
    res.send('Unknown role');
  }
}




app.get('/device_settings', (req, res) => {
  // Retrieve current device settings from the database
  const selectQuery = 'SELECT * FROM communication_settings LIMIT 1';

  pool.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving device settings:', error);
      res.status(500).send('Error retrieving device settings');
      return;
    }

    // Render the device settings dashboard with retrieved values
    const deviceSettings = results.length > 0 ? results[0] : {};
    res.render('device_settings', { deviceSettings });
  });
});

app.post('/save_device_settings', (req, res) => {
  const { comPort, baudRate, parity, stopBits, dataBits } = req.body;

  // Update device settings in the database
  const updateQuery = 'UPDATE communication_settings SET comPort = ?, baudRate = ?, parity = ?, stopBits = ?, dataBits = ? LIMIT 1';
  const updateValues = [comPort, baudRate, parity, stopBits, dataBits];

  pool.query(updateQuery, updateValues, (error, result) => {
    if (error) {
      console.error('Error updating device settings:', error);
      res.status(500).send('Error updating device settings');
    } else {
      console.log('Device settings updated successfully!');
      res.redirect('/device_settings');
    }
  });
});



module.exports = app;
