import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000


interface INote{
  id: string,
  title: string,
  description: number
}

const notes: Array<INote> = []

app.use(express.static('www'))

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const id = req.params.id
  if(!id){
    return res.status(400).json({message: "informe o campo id!"})
 }

 const note = notes.find((n)=> n.id === id)

 if(!note){
    return res.status(400).json({message: "nenhuma anotação encontrada"})
 }
  res.json(note)
})


app.post('/notes', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if(!title){
        return res.status(400).json({message: "informe o campo title!"})
    }
    if(!description){
        return res.status(400).json({message: "informe o campo description!"})
    }

    notes.push({
      id: uuidv4(),
      title,
      description,
    })



    res.json({message: "anotações salva com sucesso!"})
  })

  app.put('/notes', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description

    if(!id){
       return res.status(400).json({message: "informe o campo id!"})
    }

    const note = notes.find((n)=> n.id === id)

    if(!note){
       return res.status(400).json({message: "nenhuma anotação encontrada"})
    }

    if(!title){
        return res.status(400).json({message: "informe o campo title!"})
    }
    if(!description){
        return res.status(400).json({message: "informe o campo description!"})
    }

    for(const noteObject of notes){
      if(noteObject.id === id) {
        noteObject.title = title
        noteObject.description = description
      }

    }



    res.json({message: "anotações Alterada com sucesso!"})
  })

  app.delete('/notes', (req, res) => {
    const id = req.body.id
    
    if(!id){
       return res.status(400).json({message: "informe o campo id!"})
    }

    const note = notes.find((n)=> n.id === id)

    if(!note){
       return res.status(400).json({message: "nenhuma anotação encontrada"})
    }

    for(const index in notes){
      if(notes[index].id === id){
        notes.splice(Number(index), 1)
      }
    }


    res.json({message: "anotação Excluida com sucesso!"})
  })


app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
