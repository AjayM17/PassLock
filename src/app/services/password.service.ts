import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private databaseService: DatabaseService, private sqliteService: SqliteService) { }

  async createPassword(data: any[]) {
    return this.databaseService.executeQuery(async db => {
      const cu = 'INSERT INTO passwords ( created_time, user_id, account_name, account_id, account_password) VALUES (?,?,?,?,?);'
      let ret: any = await db.run(cu, data)
      if (ret.changes.lastId > 0) {
        return ret.changes as any;
      }
      throw Error('create product failed');
    })
  }

  async getPasswords(data: any[]): Promise<any> {
    return this.databaseService.executeQuery(async db => {
      const query = 'SELECT * FROM passwords WHERE user_id = ?;'
      const passwords: DBSQLiteValues = await db.query(query, data);
      console.log(passwords.values)
      return passwords.values
    })
  }

  async updatePassword(data: any[]){
    console.log(data)
    return this.databaseService.executeQuery(async db => {
      const up = 'UPDATE  passwords  SET account_name = ?, account_id = ?, account_password = ? WHERE password_id = ? AND user_id =  ?;'
      let ret: any = await db.run(up, data)
      if (ret.changes.changes > 0) {
        return ret.changes as any;
      }
      throw Error('update password failed');
    })
  }

  async deletePassword (data: any[]) : Promise<void> {
    return this.databaseService.executeQuery(async db => {
      const query = 'DELETE FROM passwords WHERE user_id = ? AND password_id = ?;'
      await db.query(query, data);
    })
  }
}
