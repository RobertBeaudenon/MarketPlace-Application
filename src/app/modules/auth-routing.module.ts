import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

//obj of routes
const routes: Routes = [
  //default route
  {
    path: '',
    component: AuthTabsComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AuthRoutingModule {}
