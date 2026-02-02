// application/port/input/modulo-input.token.ts
import { InjectionToken } from '@angular/core';
import { ModuloInputPort } from './modulo-input-port';

export const MODULO_INPUT_PORT =
  new InjectionToken<ModuloInputPort>('MODULO_INPUT_PORT');
