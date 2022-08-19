const express = require('express')
const app = express()
const { sequelize } = require('./models')
const router = require('./routes')
const port = 3000

app.use(express.json())
app.use(router)
app.listen(port,async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }
})

