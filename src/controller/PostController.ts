import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { post } from "../model/post";
import { PostInputDTO } from "../model/PostDTO";

export class PostController {
    public createPost = async (req: Request, res: Response) => {
        try {
            const input: PostInputDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                createdAt: req.body.createdAt,
                authorId: req.body.authorId
            }
            const postBusiness = new PostBusiness()
            await postBusiness.createPost(input)

            res.status(201).send({ message: "Post criado!" })

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public getPostId = async (req: Request, res: Response) => {
        try {
            const { idPost } = req.params
            const postBusiness = new PostBusiness()
            const result = await postBusiness.getPostId(idPost)
       
             res.status(200).send({ result })
       
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}