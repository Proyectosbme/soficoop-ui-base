import { Provider } from '@angular/core';
import { MENU_INPUT_PORT } from '@security/application/port/input/menu-input.token';
import { MENU_REPOSITORY_PORT } from '@security/application/port/output/menu-repository.token';
import { MenuApiAdapter } from '@security/framework/security/menu-api.adapter';
import { LoadMenuUseCase } from '@security/application/usecase/load-menu.usecase';
import { MenuService } from '@security/application/service/menu-application.service';
import { MenuRepositoryPort} from '@security/application/port/output/menu-repository-port';

export const SECURITY_PROVIDERS: Provider[] = [
  // OutputPort
  {
    provide: MENU_REPOSITORY_PORT,
    useClass: MenuApiAdapter
  },

  // UseCase
  {
    provide: LoadMenuUseCase,
    useFactory: (repo: MenuRepositoryPort) =>
      new LoadMenuUseCase(repo),
    deps: [MENU_REPOSITORY_PORT]
  },

  // InputPort  
  {
    provide: MENU_INPUT_PORT,
    useFactory: (uc: LoadMenuUseCase) =>
      new MenuService(uc),
    deps: [LoadMenuUseCase]
  }
];
