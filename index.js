const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})