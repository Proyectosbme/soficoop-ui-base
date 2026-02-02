// Token de inyección para el puerto de salida (repositorio) de Perfil.
// Vincula la interfaz PerfilRepositoryPort con una implementación concreta.
import { InjectionToken } from '@angular/core';
import { PerfilRepositoryPort } from './perfil-repository-port';

// Identificador único para resolver el PerfilRepositoryPort en el contenedor DI.
export const PERFIL_REPOSITORY_PORT =
  new InjectionToken<PerfilRepositoryPort>('PERFIL_REPOSITORY_PORT');
