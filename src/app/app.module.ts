import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChatService } from './chat.service';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { MeanChatComponent } from './mean-chat/mean-chat.component';
import {HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import { RegFormComponent } from './reg-form/reg-form.component';
import { GoogleApiComponent } from './google-api/google-api.component';


@NgModule({
  declarations: [
    AppComponent,
    MeanChatComponent,
    LandingComponent,
    SidebarComponent,
    DashboardComponent,
    RegFormComponent,
    GoogleApiComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    FormsModule,
    SharedModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
