import { Request, Response } from "express"
import * as note from "../services/note"
import { error } from '../libs/BindError'

const list = (req: Request<any>, res: Response<any>) =>{
    const notes = note.list()
    return res.json(notes)
}

const get = (req: Request<any>, res: Response<any>) =>{
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "informe o campo id!"})

        const noteFound = note.get(id)

        res.json(noteFound)
    } catch (err: any) {
        return error(res, err)
    }
}

const create = (req: Request<any>, res: Response<any>) =>{
    try {
        const title = req.body.title
        const description = req.body.description

        const noteCreate = note.create({title, description})
        return res.json(noteCreate)
    } catch (err: any) {
        return error(res, err)
    }

   
}

const update = (req: Request<any>, res: Response<any>) =>{
    try {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
    
        if(!id){
           return res.status(400).json({message: "informe o campo id!"})
        }

        const noteUpdated = note.update({id, title, description})
        return res.json(noteUpdated)
    } catch (err: any) {
        return error(res, err)
    }
}

const remove = (req: Request<any>, res: Response<any>) =>{
    try {
        const id = req.body.id
    
        if(!id){
           return res.status(400).json({message: "informe o campo id!"})
        }
        note.remove(id)
        res.json({sucess: true})
    } catch (err: any) {
        return error(res, err)
    }


   
}
export{
    list,
    get,
    create,
    update,
    remove
}