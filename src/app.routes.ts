import { Routes } from '@angular/router';
import { AppLayout } from './app/ui/layout/component/app.layout';
import { Notfound } from './app/ui/pages/public/notfound/notfound';
import{Login} from './app/ui/pages/security/auth/login';


export const appRoutes: Routes = [
    {
        path: '', component: AppLayout,
        children: [
            {
                path: '', loadChildren: () => import('./app/ui/pages/pages.routes').then(m => m.PAGES_ROUTES)
            }
        ]
    },
    { path: 'notfound', component: Notfound },
      { path: 'login', component: Login },
    { path: '**', redirectTo: '/notfound' }
];
