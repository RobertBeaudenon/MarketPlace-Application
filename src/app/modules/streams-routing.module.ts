import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../guards/auth.guard';

//obj of routes
const routes: Routes = [
  //default route
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access streams page otherwise he will be redirected to login/register page
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class StreamsRoutingModule {}
