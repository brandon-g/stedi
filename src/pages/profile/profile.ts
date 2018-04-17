import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MorePage } from '../more/more';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  signupError: string;
  form: FormGroup;
  userProfile: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder, 
    private auth: AuthService) {
      this.getuserprofile();
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getuserprofile() {
    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
        this.setupform();
      }  
      console.log(this.userProfile);
    });
  }

  setupform(){
    console.log("form created");
    this.form = this.fb.group({
      fname: [this.userProfile.fname || null , Validators.compose([Validators.required])],
      lname: [this.userProfile.lname || null, Validators.compose([Validators.required])],
      email: [this.userProfile.email || null, Validators.compose([Validators.required, Validators.email])],
      phone: [this.userProfile.phone || null, Validators.compose([Validators.required])],
      state: [this.userProfile.state || null, Validators.compose([Validators.required])],
      schoolDistrict: [this.userProfile.state || null, Validators.compose([])], 
    });

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
       
    };
    this.auth.setUserDoc(this.auth.afAuth.auth.currentUser,credentials).then(
      () => this.navCtrl.setRoot(MorePage),
      error => this.signupError = error.message
    );
  }

}
