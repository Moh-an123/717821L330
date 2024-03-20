const a1data=require('./Data.json')
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/companies', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'Data.json');
    const rawData = fs.readFileSync(dataPath);
    const companies = JSON.parse(rawData).companies;
    res.json({ companies });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
