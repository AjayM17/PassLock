import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  login_user_id = 0
  constructor(private databaseService: DatabaseService, private sqliteService: SqliteService) { 
  }


  async createUser(data: any[]){
  return  this.databaseService.executeQuery( async db => {
      const cu = 'INSERT INTO users ( created_time, phone, password) VALUES (?,?,?);'
       let ret: any = await db.run(cu,data)
       if (ret.changes.lastId > 0) {
        return ret.changes as any;
      }
      throw Error('create product failed');
    })
  }

  async getUser(data:any):Promise<any>{
    return this.databaseService.executeQuery( async db => {
      const query = 'SELECT * FROM users WHERE phone = ? AND password = ? limit 1;'
      const user: DBSQLiteValues = await db.query(query,data);
      return user.values as any
    })
  }


  async getUsers(): Promise<any> {
    return this.databaseService.executeQuery( async db => {
      const products: DBSQLiteValues = await db.query("select * from users");
      console.log(products.values)
      return products.values 
    })
  }

}
