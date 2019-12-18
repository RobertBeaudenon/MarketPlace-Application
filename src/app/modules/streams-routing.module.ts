import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { StreamsComponent } from '../components/streams/streams.component';

//obj of routes
const routes: Routes = [
  //default route
  {
    path: 'streams',
    component: StreamsComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class StreamsRoutingModule {}
