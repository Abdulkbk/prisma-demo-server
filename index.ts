import express, { Express, Request, Response, urlencoded, json } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app: Express = express()

app.use(urlencoded({ extended: false }))
app.use(json())

const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) =>
  res.send('Hello from express server!')
)

app.post('/signup', async (req: Request, res: Response) => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })

  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

app.listen(port, () => console.log(`Server started at port ${port}`))
