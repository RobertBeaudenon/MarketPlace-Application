import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { RequestingComponent } from '../components/requesting/requesting.component';
import { RequestersComponent } from '../components/requesters/requesters.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { MyTasksComponent } from '../components/my-tasks/my-tasks.component';
import { FavoritePostsComponent } from '../components/favorite-posts/favorite-posts.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TasksToBeCompletedComponent } from '../components/tasks-to-be-completed/tasks-to-be-completed.component';
import { TasksCompletedComponent } from '../components/tasks-completed/tasks-completed.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { RatingModule } from 'ng-starrating';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { ImagesComponent } from '../components/images/images.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewUserProfileComponent } from '../components/view-user-profile/view-user-profile.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { MapComponent } from '../components/map/map.component';

import { PostMapComponent } from '../components/post-map/post-map.component';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    RequestingComponent,
    RequestersComponent,
    NotificationsComponent,
    MyTasksComponent,
    FavoritePostsComponent,
    TasksComponent,
    TasksToBeCompletedComponent,
    TasksCompletedComponent,
    StarRatingComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserProfileComponent,
    MapComponent,
    PostMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RatingModule,
    NgxAutoScrollModule,
    FileUploadModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAG575AXnec5szkiHo2htihw_QNtuBIrT8' }),
    NgbModule
  ],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService, UsersService, MessageService, GoogleMapsAPIWrapper]
})
export class StreamsModule {}
