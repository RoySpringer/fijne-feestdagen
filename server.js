const express = require('express');
const path = require('path');
const app = express();
let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

// Main
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))