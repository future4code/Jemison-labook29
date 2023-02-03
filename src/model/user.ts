export  type user = {
    id: string,
    name: string,
    email: string,
    password: string
}

 export type friendship = {
    id: string,
    idUser: string,
    idFriend: string
}

export type endFriendship = {
    idUser: string,
    idFriend: string
}