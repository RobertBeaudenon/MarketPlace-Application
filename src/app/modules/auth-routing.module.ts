import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { FirstPageComponent } from '../components/first-page/first-page.component';

//obj of routes
const routes: Routes = [
  //default route
  {
    path: '',
    component: FirstPageComponent
  },
  {
    path: 'login',
    component: AuthTabsComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AuthRoutingModule {}
