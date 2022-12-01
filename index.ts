import express, { Express, Request, Response } from 'express'
import 'dotenv/config'

const app: Express = express()

const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) =>
  res.send('Hello from express server!')
)

app.listen(port, () => console.log(`Server started at port ${port}`))
