const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

const requestEndpoint = "https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=2023%2F06%2F30&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=2020%2F10%2F19";

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World! Added seperate async call and the url');
})

app.get('/getData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(requestEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})