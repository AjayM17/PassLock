import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

// import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  search_key = ""
  passwords: any[] | undefined 
 
  search_result: any[] | undefined
  user_id =  0
  constructor(private userService:UserService, private actionSheetCtrl: ActionSheetController,  private router: Router,private passwordService: PasswordService, private utilService: UtilService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.search_key = ""
    this.getAllPassword()
  }

  async getAllPassword() {
    const res = await this.passwordService.getPasswords([this.userService.login_user_id])
    this.passwords = res
    this.search_result = this.passwords
  }


  searchPassword = (event: any) => {
    console.log(this.search_key)
    if(this.search_key.trim() != ''){
      this.search_result = this.passwords?.filter(filed => filed['account_name'].toLowerCase().match(this.search_key.toLowerCase()))
    } else{
      this.search_result = this.passwords
    }
    
  }

  async presentActionSheet(item: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          role: 'viewDetails',
          icon: 'eye',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                item: JSON.stringify(item)
              },
              skipLocationChange: true
            }
            this.router.navigate(['/view-edit-item'], navigationExtras)
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteItem(item)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await actionSheet.present();
  }

  deleteItem = async (field: any) => {
    const data = [field['user_id'], field['password_id']]
    await this.passwordService.deletePassword(data)
    this.getAllPassword()
  }
}
