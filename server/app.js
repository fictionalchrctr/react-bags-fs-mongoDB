const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./start/initDatabase')
const routes = require('./routes/index')

const app = express()
const PORT = config.get('port') ?? 8081 // если в конфиге такого поля нет, то по умолчанию будет 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', routes)

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.greenBright('MongoDB connected'))
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    )
  } catch (error) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }
}
start()

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production')
// } else {
//   console.log('Development')
// }
