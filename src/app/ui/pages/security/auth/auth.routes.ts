import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';

export const AUTH_ROUTES: Routes = [
  { path: 'access', component: Access },
  { path: 'error', component: Error }
];
