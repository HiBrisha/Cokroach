import { Database } from "./data";
import express from 'express';
import cors from 'cors'
import { UserController,dataUser } from "./controllers/UserController";

const app = express();
app.use(express.json())
app.use(cors());

/*
const database = new Database();
const query = 'DELETE from USERS'

database.Connect(()=>{
  database.Query(query,[],()=>{
    database.Disconnect();
  })
})*/

const signUpController = new UserController((data: dataUser,query:string)=>{
  const database = new Database();
  const querySelect = `SELECT * FROM USERS WHERE (NAME = $1 OR EMAIL = $2 OR PHONE = $3) AND PASSWORD = $4`;
  query = 'INSERT INTO USERS (NAME, EMAIL, PHONE, PASSWORD) VALUES ($1, $2, $3, $4) RETURNING *';
  const insertValues = [data.name, data.email, data.phone, data.password];
  database.Connect(() => {
    database.Query(querySelect,insertValues,(result: any[]) =>{
      if (result.length > 0) {
        console.log('Information exist:', result);
        database.Disconnect();
      } else {
        database.Query(query,insertValues,() =>{
          database.Disconnect();
        });
      }
    })
  });
});

const signInController = new UserController((data: dataUser, query: string,res) => {
  const database = new Database();
  query = `SELECT * FROM USERS WHERE (NAME = $1 OR EMAIL = $2) AND password = $3`;
  database.Connect(() => {
    database.Query(query, [data.name, data.email, data.password], (result: any[]) => {
      result.length>0 ? res.status(200).json({
        message: 'User created successfully'
      }) : res.status(400).json({
        message: 'User doesn`t not exist'
      })
      console.log(result);
      database.Disconnect();
    });
  });
});

app.use('/signup',signUpController.router)
app.use('/signin',signInController.router)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/*========= API Controller ========*/
