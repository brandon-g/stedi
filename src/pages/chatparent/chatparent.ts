import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content  } from 'ionic-angular';
import * as firebase from 'firebase/app';
import FirebaseDatabase from '@firebase/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';




/**
 * Generated class for the ChatparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-chatparent',
  templateUrl: 'chatparent.html',
})

export class ChatparentPage {
  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;
  userProfile:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afd: AngularFireDatabase,
    public auth: AuthService
  ) {

    this.roomkey = "parents";
    this.nickname = "Malkesh";
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data){
        this.userProfile = data;
        this.data.nickname = data.fname + " " + data.lname;
      }
    });

    let joinData = afd.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    // joinData.set({
    //   type: 'join',
    //   user: this.nickname,
    //   message: this.nickname + ' has joined this room.',
    //   sendDate: Date()
    // });
    this.data.message = '';

    afd.database.ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatparentPage');
  }

  sendMessage() {
    let newData = this.afd.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
