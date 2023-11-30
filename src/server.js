import 'express-async-errors'
import 'dotenv/config.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import AppError from './utils/errors/AppError.js'
import routes from './routes/index.js'
import uploadConfig from './configs/upload.config.js'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://foodexplorer-development.netlify.app',
      'https://foodexplorerfront.netlify.app'
    ],
    credentials: true
  })
)

app.use(routes)

//show static image files
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

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
    message: error.message || 'Internal server error'
  })
})

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
