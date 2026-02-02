import { InjectionToken } from '@angular/core';
import { PerfilRepositoryPort } from './perfil-repository-port';

export const PERFIL_REPOSITORY_PORT =
  new InjectionToken<PerfilRepositoryPort>('PERFIL_REPOSITORY_PORT');
