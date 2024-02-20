const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

//serve static files like css etc
app.use(express.static(path.join(__dirname,'frontend')));

// Handling 404 errors
app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  res.status(404).send("test A");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

