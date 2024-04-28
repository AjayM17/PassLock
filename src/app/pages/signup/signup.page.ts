import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {
  mobile_number = ''
  password = ''
  re_password = ''

  constructor(
    private userService: UserService,
    private utilService: UtilService,
    private navController:NavController
  ) { 
   
  }

  ngOnInit() {
  }

  validateFields = () => {
    if (this.mobile_number == null || this.mobile_number.trim() == '') {
      return false
    }

    if (this.password == null || this.password.trim() == '') {
      return false
    }

    if (this.re_password == null || this.re_password.trim() == '') {
      return false
    }

    if (this.password.trim() != this.re_password.trim()) {
      return false
    }
    return true
  }

  registerUser = () => {
   if(this.validateFields()){
   const timestamp =  new Date().getTime()
   console.log(timestamp)
     const user_data = [timestamp, this.mobile_number,this.password]
     this.userService.createUser(user_data).then( res => {
      console.log(res['changes'])
      if(res['changes'] > 0){
        this.utilService.presentToast("User Created")
        this.goBackToLogin()
      } else {
        this.utilService.presentToast("Something Went Wrong")
      }
     })
   }
  }

  goBackToLogin = () => {
    this.navController.back()
  }

}
