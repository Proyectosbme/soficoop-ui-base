import { Routes } from '@angular/router';
import { AppLayout } from './app/security/ui/layout/component/app.layout';
import { Notfound } from './app/security/ui/pages/public/notfound/notfound';
import{Login} from './app/security/ui/pages/security/auth/login';


export const appRoutes: Routes = [
    {
        path: '', component: AppLayout,
        children: [
            {
                path: '', loadChildren: () => import('./app/security/ui/pages/pages.routes').then(m => m.PAGES_ROUTES)
            }
        ]
    },
    { path: 'notfound', component: Notfound },
      { path: 'login', component: Login },
    { path: '**', redirectTo: '/notfound' }
];
