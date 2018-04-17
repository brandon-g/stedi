import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

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

    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  logout(){
    this.auth.signOut();
  }

}
