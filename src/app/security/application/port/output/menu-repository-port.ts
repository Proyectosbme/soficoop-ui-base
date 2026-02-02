/**
 * PUERTO DE SALIDA: MenuRepository
 *
 * Define QUÉ necesita la aplicación del mundo exterior.
 */

import { MenuItem } from 'app/security/domain/menu.model';

/**
 *
 * Repositorio de Menú.
 * */

export interface MenuRepositoryPort {

  /**
   * Obtiene las opciones de menú para un perfil.
   *
   * @param codPerfil Identificador del perfil
   */
  cargarMenu(codPerfil: number): Promise<MenuItem[]>;


}
