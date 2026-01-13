// ui/pages/pages.routes.ts
import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
    {
        path: '', loadChildren: () =>
            import('./public/public.routes').then(m => m.PUBLIC_ROUTES)
    },
    {
        path: 'security', loadChildren: () =>
            import('./security/security.routes').then(m => m.SECURITY_ROUTES)
    }
];
