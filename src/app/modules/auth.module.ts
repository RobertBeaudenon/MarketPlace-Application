import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //speaks with the backend through http
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Reactive forms provide a model-driven approach to handling form inputs whose values change over time
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';
import { FirstPageComponent } from '../components/first-page/first-page.component';

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent, FirstPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [AuthTabsComponent, LoginComponent, SignupComponent, FirstPageComponent], //allows auth-tabs, login and register compoent to see each other
  providers: [AuthService] //connect to AuthService which will provide data from the backend
})
export class AuthModule {}
