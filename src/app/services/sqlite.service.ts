import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
  capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult,
  capNCDatabasePathResult
} from '@capacitor-community/sqlite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  sqlite: SQLiteConnection | undefined;
  isService: boolean = false;
  platform: string = 'android';
  sqlitePlugin: any;
  native: boolean = false;
  constructor() { }

  initializePlugin(): Promise<boolean> {
    return new Promise(async resolve => {
      this.platform = Capacitor.getPlatform();
      if (this.platform === 'ios' || this.platform === 'android') this.native = true;
      this.sqlitePlugin = CapacitorSQLite;
      this.sqlite = new SQLiteConnection(this.sqlitePlugin);
      // this.isService = true;
      const isSecretStored = await this.isSecretStored();
      console.log(isSecretStored)
      if (!isSecretStored.result) {
        await this.setEncryptionSecret("bdasbdbsadbasbdashdashbdhsbyeqydvywghx");
      }
      resolve(true);
    });
  }
  getPlatform() {
    return this.platform;
  }

  /**
  * Create a connection to a database
  * @param database
  * @param encrypted
  * @param mode
  * @param version
  */
  async createConnection(database: string, encrypted: boolean,
    mode: string, version: number, readonly?: boolean
  ): Promise<SQLiteDBConnection> {
    if (this.sqlite != null) {
      try {
        if (encrypted) {
          if (this.native) {
            const isSet = await this.sqlite.isSecretStored()
            if (!isSet.result) {
              return Promise.reject(new Error(`no secret phrase registered`));
            }
          }
        }

        const readOnly = readonly ? readonly : false;
        const db: SQLiteDBConnection = await this.sqlite.createConnection(
          database, encrypted, mode, version, readOnly);
        if (db != null) {
          return Promise.resolve(db);
        } else {
          return Promise.reject(new Error(`no db returned is null`));
        }
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open for ${database}`));
    }
  }
  /**
  * Close a connection to a database
  * @param database
  */
  async closeConnection(database: string, readonly?: boolean): Promise<void> {
    if (this.sqlite != null) {
      try {
        const readOnly = readonly ? readonly : false;
        await this.sqlite.closeConnection(database, readOnly);
        return Promise.resolve();
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open for ${database}`));
    }
  }

  /**
   * Retrieve an existing connection to a database
   * @param database
   */
  async retrieveConnection(database: string, readonly?: boolean):
    Promise<SQLiteDBConnection> {
    if (this.sqlite != null) {
      try {
        const readOnly = readonly ? readonly : false;
        return Promise.resolve(await this.sqlite.retrieveConnection(database, readOnly));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open for ${database}`));
    }
  }

  /**
  * Check if connection exists
  * @param database
  */
  async isConnection(database: string, readonly?: boolean): Promise<capSQLiteResult> {
    if (this.sqlite != null) {
      try {
        const readOnly = readonly ? readonly : false;
        return Promise.resolve(await this.sqlite.isConnection(database, readOnly));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }
  }

  async isSecretStored(): Promise<capSQLiteResult> {
    if (this.platform === "web") {
      return Promise.reject(new Error(`Not implemented for ${this.platform} platform`));
    }
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.isSecretStored());
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }
  }

  async setEncryptionSecret(passphrase: string): Promise<void> {
    if (this.platform === 'web') {
      return Promise.reject(new Error(`Not implemented for ${this.platform} platform`));
    }
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.setEncryptionSecret(passphrase));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }

  }

  async changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void> {
    if (this.platform === 'web') {
      return Promise.reject(new Error(`Not implemented for ${this.platform} platform`));
    }
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.changeEncryptionSecret(passphrase, oldpassphrase));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }

  }
  async checkEncryptionSecret(passphrase: string): Promise<capSQLiteResult> {
    if (this.platform === 'web') {
      return Promise.reject(new Error(`Not implemented for ${this.platform} platform`));
    }
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.checkEncryptionSecret(passphrase));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }

  }
  async clearEncryptionSecret(): Promise<void> {
    if (this.platform === 'web') {
      return Promise.reject(new Error(`Not implemented for ${this.platform} platform`));
    }
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.clearEncryptionSecret());
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }

  }

  async isDatabaseEncrypted(database: string): Promise<capSQLiteResult> {
    if (this.sqlite != null) {
      try {
        return Promise.resolve(await this.sqlite.isDatabaseEncrypted(database));
      } catch (err: any) {
        return Promise.reject(new Error(err));
      }
    } else {
      return Promise.reject(new Error(`no connection open`));
    }
  }

  // async checkAndAddEncryption() {
  //   const isEncrypted = await this.isDatabaseEncrypted(environment.databaseName)
  //   console.log(isEncrypted)
  // }
}
