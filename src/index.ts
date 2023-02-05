import {app} from "./app"
import { postRouter } from "./routes/PostRouter"
import { userRouter } from "./routes/UserRouter"

app.use('/user', userRouter)

app.use('/post', postRouter)

/**************************** TYPES ******************************/

//type authenticationData = {
//   id: string
//}