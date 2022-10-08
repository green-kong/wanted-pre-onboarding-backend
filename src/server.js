require('dotenv').config();
const express = require('express');
const sequelize = require('./db/models').sequelize;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, async () => {
  console.log(`🚀 Server is Started with port : ${PORT}`);
  await sequelize.sync({force: false});
  console.log('👍 DB is connected');
});
