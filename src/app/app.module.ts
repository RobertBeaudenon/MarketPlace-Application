import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsComponent } from './components/streams/streams.component';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';

//This file contains all the modules and components that is contained in the application
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule, StreamsModule, StreamsRoutingModule],
  providers: [CookieService], //to manage cookie in frontend
  bootstrap: [AppComponent]
})
export class AppModule {}
