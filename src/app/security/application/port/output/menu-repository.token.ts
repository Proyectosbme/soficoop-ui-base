// application/port/output/menu-repository.token.ts
import { InjectionToken } from '@angular/core';
import { MenuRepositoryPort } from './menu-repository-port';

export const MENU_REPOSITORY_PORT =
  new InjectionToken<MenuRepositoryPort>('MENU_REPOSITORY_PORT');
