import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MigrationsService } from './services/migrations.service';
import { SqliteService } from './services/sqlite.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform:Platform, private sqliteService:SqliteService, private migrationsService: MigrationsService) {
    platform.ready().then(() =>{
     sqliteService.initializePlugin().then(res =>{
      migrationsService.migrateTable()
      // sqliteService.checkAndAddEncryption()
     })
    })
  }
}
