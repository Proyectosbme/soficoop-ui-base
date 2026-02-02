// Token de inyección para el puerto de entrada de Perfil.
// Se utiliza para enlazar la interfaz PerfilInputPort con su implementación.
import { InjectionToken } from '@angular/core';
import { PerfilInputPort } from './perfil-input-port';

// Identificador único para resolver el PerfilInputPort en el contenedor DI.
export const PERFIL_INPUT_PORT =
  new InjectionToken<PerfilInputPort>('PERFIL_INPUT_PORT');
