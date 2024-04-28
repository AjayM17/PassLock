import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {

  account_name = ""
  account_id = ""
  account_password = ""
  passwordInputType = ""
  constructor(private navController: NavController, private userService: UserService, private passwordService: PasswordService, private utilService: UtilService) { }

  ngOnInit() {
  }

  togglePasswordInputType() {
    if (this.passwordInputType == 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  addNewField = () => {
    const timestamp = new Date().getTime()
    const data = [timestamp, this.userService.login_user_id, this.account_name, this.account_id, this.account_password]
    this.passwordService.createPassword(data).then(res => {
      if (res['changes'] > 0) {
        this.utilService.presentToast("Field Created")
        this.navController.back()
      } else {
        this.utilService.presentToast("Something Went Wrong")
      }
    })
  }

  getEncryptedPassword = () => {
    // if (this.validateFields()) {
    //   this.userDetailsService.getEncryptedPassword(this.account_password).then(res => {
    //     this.addNewField(res)
    //   }).catch(err => {
    //     this.widgitsService.presentToast('Failed to add')
    //   })
    // }
  }

}
