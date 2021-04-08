import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './nav-bar/home/home.component';
import { SandboxComponent } from './nav-bar/sandbox/sandbox.component';
import { TemperatureComponent } from './nav-bar/temperature/temperature.component';
import { SigninComponent } from './nav-bar/signin/signin.component';
import { AppComponent } from './app.component';
import { OptionsComponent } from './nav-bar/options/options.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'options', component: SandboxComponent },//Change to OptionsComponent
  { path: 'charts', component: TemperatureComponent },
  //{path: 'options', component: SandboxComponent},
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    SandboxComponent,
    HomeComponent,
    OptionsComponent,
    SigninComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
