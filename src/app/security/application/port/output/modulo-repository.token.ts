// application/port/output/modulo-repository.token.ts
// Token de inyección para el puerto de salida (repositorio) de Módulo.
// Se usa para registrar e inyectar la implementación del ModuloRepositoryPort.
import { InjectionToken } from '@angular/core';
import { ModuloRepositoryPort } from './modulo-repository-port';

// Identificador único para resolver el ModuloRepositoryPort en el contenedor DI.
export const MODULO_REPOSITORY_PORT =
  new InjectionToken<ModuloRepositoryPort>('MODULO_REPOSITORY_PORT');
