const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
dayjs().format();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

const now = dayjs();
const nowLW = dayjs().subtract(7, 'days');

const today = `${now.year()}%2F${now.month()+1}%2F${now.date()}`;
const lastWeek = `${nowLW.year()}%2F${nowLW.month()+1}%2F${nowLW.date()}`;

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

const todaysRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${today}`; 
const lastWeekRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${lastWeek}`;
const allDataRequest = `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${today}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=2020%2F10%2F19`;

app.get('/', cors(corsOptions), (req, res) => {
  res.send(`Hello World! Welcome to my server :)
  Today: ${today}
  Last week: ${lastWeek}
  Server time: ${now.format()}
  `);
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