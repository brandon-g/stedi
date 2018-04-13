import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentingPage } from './parenting';

@NgModule({
  declarations: [
    ParentingPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentingPage),
  ],
})
export class ParentingPageModule {}
