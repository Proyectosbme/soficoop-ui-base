// ui/pages/security/security.routes.ts
import { Routes } from '@angular/router';
import { HolaMundo } from './hola-mundo/hola-mundo';

export const SECURITY_ROUTES: Routes = [
    { path: 'hola-mundo', component: HolaMundo },
    { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) }
];
