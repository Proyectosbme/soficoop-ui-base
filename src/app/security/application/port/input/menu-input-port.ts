    /**
     *
     *  PUERTO DE ENTRADA (Input Port)
     */

import { MenuItem } from 'app/security/domain/menu.model';

/**
 *
 * Repositorio de Menú.
 * **/

export interface MenuInputPort {

    cargarMenu(codPerfil: number): Promise<MenuItem[]>;

}
