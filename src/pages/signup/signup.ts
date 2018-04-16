import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from './../home/home';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupError: string;
  form: FormGroup;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    fb: FormBuilder ,
    private auth: AuthService
  ) {
    this.form = fb.group({
      fname: ['', Validators.compose([Validators.required])],
      lname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      schoolDistrict: ['', Validators.compose([])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      terms: ['', Validators.compose([Validators.required])] 
    });
  }   

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    let data = this.form.value;
    let credentials = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phone: data.phone, 
      state: data.state,
      schoolDistrict: data.schoolDistrict,
      password: data.password,
      terms: data.terms
    };
    this.auth.signUp(credentials).then(
      () => this.navCtrl.setRoot(TabsPage),
      error => this.signupError = error.message
    );
  }


}
