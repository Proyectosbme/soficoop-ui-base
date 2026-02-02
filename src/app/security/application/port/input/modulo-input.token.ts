// application/port/input/modulo-input.token.ts
// Token de inyección para el puerto de entrada de Módulo.
// Permite inyectar una implementación concreta de ModuloInputPort.
import { InjectionToken } from '@angular/core';
import { ModuloInputPort } from './modulo-input-port';

// Identificador único para resolver el ModuloInputPort en el contenedor DI.
export const MODULO_INPUT_PORT =
  new InjectionToken<ModuloInputPort>('MODULO_INPUT_PORT');
