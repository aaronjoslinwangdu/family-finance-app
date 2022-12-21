const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api', (req, res) => {
  res.json({ messsage: 'Express backend is connected to React' });
});