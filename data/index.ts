import { Client } from 'pg';
import { config } from 'dotenv';

export class Database {
    private client:Client

    public constructor(){
        config();
        this.client=new Client({
            connectionString:process.env.DATABASE_URL_USER
        });
    }

    public Connect(callback:()=>void){
        this.client.connect((err:Error)=>{
            if(err){
                console.log('Error connecting to database', err.message)
            }else{
                console.log('Connect to database successful')
            }

            callback();
        })
    }

      public Query(query: string,values:any[],callback:((rows: any[]) => void)) {
        this.client.query(query, values, (err:Error,result: { rows: any[] }) => {
            if (err) {
              console.log("Error:", err.message);
            } else {
              console.log("Query successful");
              callback(result.rows);
            }
          });
      }

    public Disconnect(){
        this.client.end();
        console.log('Disconnect database')
    }
}

