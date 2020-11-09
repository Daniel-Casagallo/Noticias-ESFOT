import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuInvitadoPageRoutingModule } from './menu-invitado-routing.module';

import { MenuInvitadoPage } from './menu-invitado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuInvitadoPageRoutingModule
  ],
  declarations: [MenuInvitadoPage]
})
export class MenuInvitadoPageModule {}
