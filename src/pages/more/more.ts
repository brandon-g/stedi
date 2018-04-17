import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  userProfile: any; 
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private auth: AuthService,
    ) {

    this.getuserprofile();
  }
 
  getuserprofile(){
    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
      }else {
        this.auth.setblankuserprofile();
      }
      console.log(this.userProfile);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  logout(){
    this.auth.signOut();
  }

  editprofile(){
    this.navCtrl.push(ProfilePage); 
  }

}
