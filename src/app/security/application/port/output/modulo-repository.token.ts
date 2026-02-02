// application/port/output/modulo-repository.token.ts
import { InjectionToken } from '@angular/core';
import { ModuloRepositoryPort } from './modulo-repository-port';

export const MODULO_REPOSITORY_PORT =
  new InjectionToken<ModuloRepositoryPort>('MODULO_REPOSITORY_PORT');
