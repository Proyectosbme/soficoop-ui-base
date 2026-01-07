import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { HolaMundo } from './app/pages/hola-mundo/hola-mundo';


export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'hola-mundo', component: HolaMundo }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
