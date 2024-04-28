import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-view-edit-item',
  templateUrl: './view-edit-item.page.html',
  styleUrls: ['./view-edit-item.page.scss'],
})
export class ViewEditItemPage implements OnInit {

  account_name = null
  account_id = null
  account_password = null
  // decrypted_password = null
  passwordInputType = "password"
  password_id = null
  user_id = null
  editable = false
  constructor(private utilService: UtilService,  private navController: NavController, private passwordService: PasswordService, private activateRoute: ActivatedRoute,) {
    activateRoute.queryParams.subscribe(param => {
      this.account_name = JSON.parse(param['item'])['account_name']
      this.account_password = JSON.parse(param['item'])['account_password']
      this.account_id = JSON.parse(param['item'])['account_id']
      this.password_id = JSON.parse(param['item'])['password_id']
      this.user_id = JSON.parse(param['item'])['user_id']
      // this.decrypted_password = this.account_password
    })
  }

  ngOnInit() {
  }


  toggleEditabel = () => {
    this.editable = !this.editable
  }

  togglePasswordInputType() {
    if (this.passwordInputType == 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  updateItem = () => {
    const data = [this.account_name, this.account_id, this.account_password,this.password_id,this.user_id]
    this.passwordService.updatePassword(data).then(res => {
      console.log(res['changes'])
      if (res['changes'] > 0) {
        this.utilService.presentToast("Field Updated")
        // this.navController.back()
      } else {
        this.utilService.presentToast("Something Went Wrong")
      }
    })
  }

  getEncryptedPassword = () => {
    // if (this.validateFields()) {
    //   this.userDetailsService.getEncryptedPassword(this.decrypted_password).then(res => {
    //     this.updateItem(res)
    //   }).catch(err => {
    //     this.widgitsService.presentToast('Failed to add')
    //   })
    // }
  }
}
