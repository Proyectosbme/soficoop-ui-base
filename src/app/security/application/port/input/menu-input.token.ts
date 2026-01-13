// application/port/input/menu-input.token.ts
import { InjectionToken } from '@angular/core';
import { MenuInputPort } from './menu-input-port';

export const MENU_INPUT_PORT =
  new InjectionToken<MenuInputPort>('MENU_INPUT_PORT');
