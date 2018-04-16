import { Component } from '@angular/core';
import { Platform, Tab } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { RollPage } from '../pages/roll/roll';
 
 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage; 

  constructor(
      private platform: Platform, 
      private statusBar: StatusBar, 
      private splashScreen: SplashScreen,
      private auth: AuthService
  ) {
    

    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            
            if(this.auth.hasrolls()){

              this.rootPage = TabsPage;
 
            }else{

              this.rootPage = RollPage;

            }

            
          } else {
            this.rootPage = LoginPage;
          }
          console.log(user);
        },
        () => {
          this.rootPage = LoginPage;
        }
      );

  }
}
