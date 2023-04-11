const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const newDate = new Date();
const todaysDate = new Date().toLocaleDateString('en-gb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'America/Chicago'
});
const lastWeekDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 7).toLocaleDateString('en-gb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'America/Chicago'
});

let day = todaysDate.substring(0,2);
let month = todaysDate.substring(3,5);
let year = todaysDate.substring(6,10);

const today = `${year}%2F${month}%2F${day}`;

let dayLW = lastWeekDate.substring(0,2);
let monthLW = lastWeekDate.substring(3,5);
let yearLW = lastWeekDate.substring(6,10);

const lastWeek = `${yearLW}%2F${monthLW}%2F${dayLW}`;

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

const todaysRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${today}`; 
const lastWeekRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${lastWeek}`;
const allDataRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=2020%2F10%2F19`;

app.get('/', cors(corsOptions), (req, res) => {
  res.send(`Hello World! Today is ${today}! Welcome to my server :)`);
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