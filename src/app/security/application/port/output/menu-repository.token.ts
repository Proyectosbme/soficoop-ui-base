// application/port/output/menu-repository.token.ts
// Token de inyección para el puerto de salida (repositorio) de Menú.
// Permite enlazar la interfaz MenuRepositoryPort con su implementación.
import { InjectionToken } from '@angular/core';
import { MenuRepositoryPort } from './menu-repository-port';

// Identificador único para resolver el MenuRepositoryPort en el contenedor DI.
export const MENU_REPOSITORY_PORT =
  new InjectionToken<MenuRepositoryPort>('MENU_REPOSITORY_PORT');
