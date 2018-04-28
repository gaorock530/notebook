const express = require('express');
const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');

const app = express();

app.disable('etag').disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, (e) => {
  console.log(e || `React server is running on port 3000...`);
  openBrowser('http://localhost:3000');
})