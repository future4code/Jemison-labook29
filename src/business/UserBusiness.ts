import { UserDatabase } from "../data/UserDatabase";
import { InvalidFriendship } from "../error/CustomError";
import { endFriendship, friendship, user } from "../model/user";
import { IdFriendshipInputDTO, UserInputDTO } from "../model/UserDTO";
import { generateId } from "../services/idGenerator";

export class UserBusiness {
    public createUser = async (input: UserInputDTO) => {
        try {
            const userDatabase = new UserDatabase()
            const { name, email, password } = input

            const id: string = generateId()

            const user: user = {
                id,
                name,
                email,
                password
            }

            await userDatabase.createUser(user)

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public makeFriendship = async (input: IdFriendshipInputDTO) => {
        try {
            const userDatabase = new UserDatabase()
            const { idUser, idFriend } = input

            const id: string = generateId()

            const friendship: friendship = {
                id,
                idUser,
                idFriend
            }

            await userDatabase.makeFriendship(friendship)

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public endFrienship = async (input: IdFriendshipInputDTO) => {
        try {
            const { idUser, idFriend } = input

            const endFriendship: endFriendship = {
                idUser,
                idFriend
            }

            const userDatabase = new UserDatabase()
            const friend = await userDatabase.findUser(idUser, idFriend)
            
            if (idFriend !== friend) {
                throw new InvalidFriendship()
            }

            await userDatabase.endFrienship(endFriendship)


        } catch (error: any) {
            throw new Error(error.message)

        }
    }
}