// application/port/input/menu-input.token.ts
// Token de inyección para el puerto de entrada de Menú.
// Se usa porque las interfaces no existen en runtime; el token permite
// registrar e inyectar la implementación concreta desde el módulo de providers.
import { InjectionToken } from '@angular/core';
import { MenuInputPort } from './menu-input-port';

// Identificador único para resolver el MenuInputPort en el contenedor DI.
export const MENU_INPUT_PORT =
  new InjectionToken<MenuInputPort>('MENU_INPUT_PORT');
