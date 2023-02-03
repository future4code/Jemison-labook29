import { CustomError } from "../error/CustomError";
import { endFriendship, friendship, user } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private userTable = "labook_users"
    private friendTable = "labook_friend"

    public createUser = async (user: user) => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection.insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into(this.userTable)

        } catch (error: any) {
            throw new Error(error.message)

        } finally {
            console.log("Conexão encerrada!")
            UserDatabase.connection.destroy()
        }
    }

    public makeFriendship = async (friendship: friendship) => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection.insert({
                id: friendship.id,
                id_user: friendship.idUser,
                id_friend: friendship.idFriend
            }).into(this.friendTable)

        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            console.log("Conexão encerrada!")
            UserDatabase.connection.destroy()
        }
    }

    public endFrienship = async (endFriendship: endFriendship) => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection
                .delete()
                .from(this.friendTable)
                .where({
                    id_friend: endFriendship.idFriend
                })

        } catch (error: any) {
            throw new Error(error.message)

        } finally {
            console.log("Conexão encerrada!")
            UserDatabase.connection.destroy()
        }
    }

    public findUser = async (idUser: string, idFriend: string) => {
        try {
            const result = await UserDatabase.connection(this.friendTable)
                .select()
                .where({ id_user: idUser, id_friend: idFriend });

            return result[0];
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}