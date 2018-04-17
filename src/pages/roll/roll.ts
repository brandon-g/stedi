import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the RollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roll',
  templateUrl: 'roll.html',
})
export class RollPage {
  rollForm: FormGroup;
  rollError: string;
  roll:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private fb: FormBuilder) {
    
    this.rollForm = this.fb.group({
      parent: [null],
      subteacher: [null],
      teacher: [null]
    });

    this.auth.rolls.valueChanges().subscribe(data=>{
      this.roll = data;
      //console.log(this.roll);
      this.setRolls();
    });

  }
  setRolls(){
    this.rollForm = this.fb.group({
      parent: [this.roll ? this.roll.parent : null],
      subteacher: [this.roll ? this.roll.subteacher : null],
      teacher: [this.roll ? this.roll.teacher : null]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RollPage');
  }

  updateroll(){
    let data = this.rollForm.value;
    this.auth.updaterolls(data);
    if(this.navParams.get('setRootPage')==true){
      this.navCtrl.setRoot(TabsPage);  
    }
    return false;
  }

}
