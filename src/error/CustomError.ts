export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidFriendship extends CustomError{ 
    constructor(){
        super(400, "Essa amizade não existe!")
    }
}