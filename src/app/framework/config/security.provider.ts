import { Provider } from '@angular/core';
import { LoadMenuUseCase } from '@application/usecase/load-menu.usecase';
import { MenuApiService } from '@framework/security/menu-api.service';

// framework/config/security.providers.ts
export const SECURITY_PROVIDERS: Provider[] = [
     // Menu
    {
        provide: LoadMenuUseCase,
        useFactory: (repo: MenuApiService) =>
            new LoadMenuUseCase(repo),
        deps: [MenuApiService]
    }
];

