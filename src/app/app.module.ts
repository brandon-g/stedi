import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/auth.service';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { SignupPage } from '../pages/signup/signup';

import { IonicStorageModule } from '@ionic/storage';
import { RollPage } from '../pages/roll/roll';
import { MorePage } from '../pages/more/more';
import { ChatPage } from '../pages/chat/chat';
import { ChatparentPage } from '../pages/chatparent/chatparent';
import { ChatsubteacherPage } from '../pages/chatsubteacher/chatsubteacher';
import { ChatteacherPage } from '../pages/chatteacher/chatteacher';
import { ProfilePage } from '../pages/profile/profile';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage, 
    RollPage,
    MorePage,
    ChatPage,
    ChatparentPage,
    ChatsubteacherPage,
    ChatteacherPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot()
  ], 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    RollPage,
    MorePage,
    ChatPage,
    ChatparentPage,
    ChatsubteacherPage,
    ChatteacherPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService, 
    AngularFireDatabase

  ]
})
export class AppModule {}
