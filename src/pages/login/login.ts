import { Component } from '@angular/core';
import { IonicPage , NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from './../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { TabsPage } from './../tabs/tabs';
 
import { RollPage } from './../roll/roll';
 

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private auth: AuthService,
      fb: FormBuilder

    ) { 

    this.loginForm = fb.group({
      email: ['themalkesh987@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.compose([Validators.required, Validators.minLength(6)])]
    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials).then((result)=>{
      // this.auth.getrolls(); 
      // this.auth.rolls.valueChanges().subscribe((roll) => { 
      //   console.log(roll);
      //   if (roll) {
      //     this.navCtrl.setRoot(TabsPage);
      //   } else {
      //     this.navCtrl.setRoot(RollPage);
      //     this.navCtrl.setRoot(RollPage, {
      //       setRootPage: true
      //     })
      //   }
      // })
       
    }); 

      // .then(
      // () => this.navCtrl.setRoot(TabsPage),
      //   error => this.loginError = error.message
      // );
  }
  signup() {
    this.navCtrl.push(SignupPage);
    return false;
  }
  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
      () => this.navCtrl.setRoot(TabsPage),
        error => console.log(error.message)
      );
  }

}
