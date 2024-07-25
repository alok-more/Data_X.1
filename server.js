// const express = require('express');
// const loginApp = require('./login');
// const currentDatalogApp = require('./live_data');
// const allDataApp = require('./database_data');
// const historyView = require('./history_view')

// const app = express();

// // Mount the login app
// app.use('/', loginApp);

// // Mount the current datalog app
// app.use('/', currentDatalogApp);

// //mount the all datalog app
// app.use('/',allDataApp);

// //mount the history data app
// app.use('/',historyView);

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const loginApp = require('./login');
const currentDatalogApp = require('./live_data');
const allDataApp = require('./database_data');
const historyView = require('./history_view');
const register = require('./register');
const graph_view = require('./graph_view');

const app = express();

// Mount the login app
app.use('/', loginApp);

// Mount the current datalog app
app.use('/', currentDatalogApp);

// Mount the all datalog app
app.use('/', allDataApp);

// Mount the history data app
app.use('/', historyView);

// mount the register data app
app.use('/', register);

app.use('/', graph_view);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
