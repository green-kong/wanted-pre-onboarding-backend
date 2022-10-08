require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const sequelize = require('./db/models').sequelize;
const router = require('./routers');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(PORT, async () => {
  console.log(`🚀 Server is Started with port : ${PORT}`);
  await sequelize.sync({force: false});
  console.log('👍 DB is connected');
});
