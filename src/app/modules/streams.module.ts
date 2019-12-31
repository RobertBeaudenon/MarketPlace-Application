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
    TasksToBeCompletedComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService, UsersService]
})
export class StreamsModule {}
