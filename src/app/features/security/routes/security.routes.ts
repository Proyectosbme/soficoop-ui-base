// ui/pages/security/security.routes.ts
import { Routes } from '@angular/router';
import { HolaMundo } from '../pages/hola-mundo/hola-mundo';
import { ModuloPage } from '../pages/modulo/modulo';
import { PerfilPage } from '../pages/perfil/perfil';

export const SECURITY_ROUTES: Routes = [
    { path: 'hola-mundo', component: HolaMundo },
    { path: 'modulo', component: ModuloPage },
    { path: 'perfil', component: PerfilPage },
    { path: 'auth', loadChildren: () => import('../pages/auth/auth.routes').then(m => m.AUTH_ROUTES) }
];
