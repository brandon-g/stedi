import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatteacherPage } from './chatteacher';

@NgModule({
  declarations: [
    ChatteacherPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatteacherPage),
  ],
})
export class ChatteacherPageModule {}
