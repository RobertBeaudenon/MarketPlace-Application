import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../guards/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { RequestingComponent } from '../components/requesting/requesting.component';
import { RequestersComponent } from '../components/requesters/requesters.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TasksCompletedComponent } from '../components/tasks-completed/tasks-completed.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserProfileComponent } from '../components/view-user-profile/view-user-profile.component';

//obj of routes
const routes: Routes = [
  //routes
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access streams page otherwise he will be redirected to login/register page
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'people/requesting',
    component: RequestingComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'people/requesters',
    component: RequestersComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'tasksCompleted',
    component: TasksCompletedComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'rating/:id',
    component: StarRatingComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    path: ':name',
    component: ViewUserProfileComponent,
    canActivate: [AuthGuard] //if user has a valid token he will be able to access comment page
  },
  {
    //keep this route at the end because when it's going to verify the routes its going from top to bottom
    path: '**', //redirect any route that user type that doesnt exist, to streams route
    redirectTo: 'streams'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class StreamsRoutingModule {}
