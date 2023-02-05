import { post } from "../model/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private postTable = "labook_posts"

    public createPost = async (post: post) => {
        try {
            PostDatabase.connection.initialize()
            await PostDatabase.connection.insert({
                id: post.id,
                photo: post.photo,
                description: post.description,
                type: post.type,
                author_id: post.authorId
            }).into(this.postTable)

        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            console.log("Conexão encerrada!")
            PostDatabase.connection.destroy()
        }
    }

    public getPostId = async (id: string):Promise<post> => {
        try {
            PostDatabase.connection.initialize()
            const queryResult = await PostDatabase.connection()
                .select("*")
                .from(this.postTable)
                .where({ id })

            const post: post= {
                id: queryResult[0].id,
                photo: queryResult[0].photo,
                description: queryResult[0].description,
                type: queryResult[0].type,
                authorId: queryResult[0].author_id,
            }
            return post

        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            console.log("Conexão encerrada!")
            PostDatabase.connection.destroy()
        }
    }

    public seeFeed = async () => {
        try {
            PostDatabase.connection.initialize()
            const result = await PostDatabase.connection()
                .select("*")
                .from(this.postTable)
                .orderBy("created_at", "DESC")

            return result

        } catch (error: any) {
            throw new Error(error.message)

        } finally {
            console.log("Conexão encerrada!")
            PostDatabase.connection.destroy()
        }
    }
}