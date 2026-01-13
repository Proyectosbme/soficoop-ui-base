import { Routes } from '@angular/router';
import { AppLayout } from './app/core/ui/layout/component/app.layout';
import { Notfound } from './app/core/ui/public/notfound/notfound';
import{Login} from './app/security/ui/pages/auth/login';


export const appRoutes: Routes = [
    {
        path: '', component: AppLayout,
        children: [
            {
                path: '', loadChildren: () => import('./app/core/ui/pages.routes').then(m => m.PAGES_ROUTES)
            }
        ]
    },
    { path: 'notfound', component: Notfound },
      { path: 'login', component: Login },
    { path: '**', redirectTo: '/notfound' }
];
