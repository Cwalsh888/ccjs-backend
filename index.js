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
const start = dayjs().subtract(7, 'days');

const endDate = `${now.year()}%2F${now.month()+1}%2F${now.date()}`;
const startDate = `${start.year()}%2F${start.month()+1}%2F${start.date()}`;

const dynamicRequest = (days) => {
  const start = dayjs().subtract(days, 'days');
  const startStr = `${start.year()}%2F${start.month()+1}%2F${start.date()}`;

  return `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${endDate}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${startStr}`;
};

app.use(cors());
const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

app.get('/', cors(corsOptions), (req, res) => {
  res.send(`Hello World! Welcome to my server :)
  Today: ${endDate}
  Last week: ${startDate}
  Server time: ${now.format()}
  `);
})

app.get('/getTodaysData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(dynamicRequest(0), fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.get('/getHistoricalData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(dynamicRequest(req.query.days), fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})