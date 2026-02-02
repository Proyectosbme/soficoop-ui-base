// ui/pages/security/security.routes.ts
import { Routes } from '@angular/router';
import { HolaMundo } from './hola-mundo/hola-mundo';
import { ModuloPage } from './modulo/modulo';
import { PerfilPage } from './perfil/perfil';

export const SECURITY_ROUTES: Routes = [
    { path: 'hola-mundo', component: HolaMundo },
    { path: 'modulo', component: ModuloPage },
    { path: 'perfil', component: PerfilPage },
    { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) }
];
