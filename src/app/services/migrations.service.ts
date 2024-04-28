import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MigrationsService {

  constructor(private databaseService: DatabaseService) { }

  async migrateTable() {
    await this.createUserTable()
    await this.createPasswordTable()
  }

  async createUserTable() {
    const ct = 'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, created_time TEXT NOT NULL UNIQUE, phone TEXT NOT NULL UNIQUE, password TEXT NOT NULL);'
    await this.databaseService.executeQuery(async db => {
      await db.execute(ct)
    })
  }

  async createPasswordTable() {
    const ct = 'CREATE TABLE IF NOT EXISTS passwords (password_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, created_time TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL,  account_name TEXT NOT NULL,account_id TEXT, account_password TEXT);'
    await this.databaseService.executeQuery(async db => {
      await db.execute(ct)
    })
  }

}
