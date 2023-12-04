import 'express-async-errors'
import 'dotenv/config.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import AppError from './utils/errors/AppError.js'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
  })
)

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: error.message
  })
})

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
