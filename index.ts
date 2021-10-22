import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import * as note from './controllers/note'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))


//ROTAS
app.get('/notes', note.list)
app.get('/notes/:id', note.get)
app.post('/notes', note.create)
app.put('/notes', note.update)
app.delete('/notes', note.remove)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
