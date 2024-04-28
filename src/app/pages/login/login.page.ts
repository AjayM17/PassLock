import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private utilService: UtilService, private router:Router, private userService:UserService) { }
  mobile_number = ''
  password = ''
  ngOnInit() {
  }


  async loginUser() {
    if (this.validateFields()) {
      const data = [this.mobile_number, this.password]
      this.userService.getUser(data).then( (res:any )=> {
        if(res.length > 0){
          this.userService.login_user_id = res[0]['user_id']
          this.router.navigate(['dashboard'])
        } else{
          this.utilService.presentToast('No User found')
        }
      })
    }
  }

  validateFields = () => {
    if (this.mobile_number == null || this.mobile_number.trim() == '') {
       this.utilService.presentToast('Please Enter Mobile Number')
      return false
    }
    if (this.password == null || this.password.trim() == '') {
       this.utilService.presentToast('Please Enter Password')
      return false
    }
    return true
  }
}
