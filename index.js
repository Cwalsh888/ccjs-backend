const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const dynamicRequest = (days, now, endDate) => {
  const start = now.subtract(days, 'days');
  const startStr = `${start.year()}%2F${start.month()+1}%2F${start.date()}`;

  return `https://signup.com/api/events?accesskey=13fcbcd593bef760aaa4feeea1f7d14424466e1a&activity_id=3424432&enddate=${endDate}&include_comments=false&include_jobassignments=true&include_jobs=true&my_jobs=false&selected_activity=3424432&startdate=${startStr}`;
};

app.use(cors());

app.use((req, res, next) => {
  const now = dayjs().subtract(5, 'hours');
  res.locals.now = now;
  res.locals.endDate = `${now.year()}%2F${now.month()+1}%2F${now.date()}`;

  next();
})

const corsOptions = {
  origin: ["http://localhost:3000", "https://ccjs.onrender.com"]
};

app.get('/', cors(corsOptions), (req, res) => {
  res.send(`
  <div>Hello World! Welcome to my server :)</div>
  <div>Server time in CST: ${req.res.locals.now.format()}</div>
  `);
})

app.get('/getTodaysData', cors(corsOptions), async (req, res) => {
  const now = req.res.locals.now;
  const endDate = req.res.locals.endDate;
  
  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(dynamicRequest(0, now, endDate), fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse.data[0].jobs);
})

app.get('/getHistoricalData', cors(corsOptions), async (req, res) => {
  const now = req.res.locals.now;
  const endDate = req.res.locals.endDate;
  const days = req.query.days;

  const fetchOptions = {
      method: 'GET'
  }
  const response = await fetch(dynamicRequest(days, now, endDate), fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})