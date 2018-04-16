import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { RollPage } from '../roll/roll';

import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  roll: any; 
  rolls:[any];
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private auth: AuthService, private fb: FormBuilder) {

    this.auth.rolls.valueChanges().subscribe(data => {
      this.roll = data;
      console.log(this.roll);
      //this.setRolls();
    });

  }
  setRolls() {
     
  }

  presentRollPopover(myEvent){
    let popover = this.popoverCtrl.create(RollPage);
    popover.present({
      ev: myEvent
    }); 
  }

}
