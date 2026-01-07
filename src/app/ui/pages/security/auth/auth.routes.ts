import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';

export const AUTH_ROUTES: Routes = [
  { path: 'access', component: Access },
  { path: 'error', component: Error }
];
