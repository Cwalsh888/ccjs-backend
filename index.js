const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const todaysDate = new Date();
const lastWeekDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() - 7);

let day = todaysDate.getDate().toString().padStart(2, '0');
let month = (todaysDate.getMonth() + 1).toString().padStart(2, '0');
let year = todaysDate.getFullYear();

const today = `${year}%2F${month}%2F${day}`;

let dayLW = lastWeekDate.getDate().toString().padStart(2, '0');
let monthLW = (lastWeekDate.getMonth() + 1).toString().padStart(2, '0');
let yearLW = lastWeekDate.getFullYear(); 

const lastWeek = `${yearLW}%2F${monthLW}%2F${dayLW}`;

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

const todaysRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${today}`; 
const lastWeekRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${yearLW}%2F${monthLW}%2F${dayLW}`;
const allDataRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=2020%2F10%2F19`;

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World! Welcome to my server :)');
})

app.get('/getTodaysData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(todaysRequest, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.get('/getLastWeekData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(lastWeekRequest, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.get('/getAllData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(allDataRequest, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})