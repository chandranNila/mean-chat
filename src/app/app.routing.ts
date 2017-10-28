import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingComponent} from './landing/landing.component';
import {MeanChatComponent} from './mean-chat/mean-chat.component';
import {RegFormComponent} from './reg-form/reg-form.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'groupChat',
    component: MeanChatComponent
  },
  {
    path: 'registrationForm',
    component: RegFormComponent
  }
];
