import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuInvitadoPage } from './menu-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: MenuInvitadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuInvitadoPageRoutingModule {}
