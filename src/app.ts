import  express, { Application, Request, Response} from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/Users/users.route';

const app : Application = express()


app.use(express.json())
app.use(cors())

//application routes
app.use('/api',UserRoutes)



app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

console.log(process.cwd());

export default app;