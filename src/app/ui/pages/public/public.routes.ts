// ui/pages/public/public.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Notfound } from './notfound/notfound';

export const PUBLIC_ROUTES: Routes = [
  { path: '', component: Home }
];
