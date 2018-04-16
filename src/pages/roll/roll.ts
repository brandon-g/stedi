import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      parent: [this.roll.parent],
      subteacher: [this.roll.subteacher],
      teacher: [this.roll.teacher]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RollPage');
  }

  updateroll(){
    let data = this.rollForm.value;
    this.auth.updaterolls(data).then((data)=>{
      console.log(data); 
    })
    return false;
  }

}
