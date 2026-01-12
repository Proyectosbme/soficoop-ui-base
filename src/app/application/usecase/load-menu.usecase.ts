import { MenuRepository } from '@application/port/output/menuRepository';
import { MenuItem } from '@domain/menu.model';
import {
    EmptyMenuException,
    InvalidProfileException
} from '@domain/security.exceptions';

/**
 * Caso de uso: Cargar menú del sistema.
 *
 * PUERTO DE ENTRADA (Input Port)
 *
 * - Define QUÉ puede hacer el sistema.
 * - Contiene reglas del negocio.
 * - Orquesta el flujo.
 * - NO conoce infraestructura ni HTTP.
 */
export class LoadMenuUseCase {

    constructor(
        /**
         * Dependencia hacia un PUERTO DE SALIDA.
         *
         * El caso de uso necesita obtener información del exterior,
         * pero NO sabe cómo ni desde dónde.
         */
        private readonly repository: MenuRepository
    ) { }

    /**
     * Ejecuta la carga del menú para un perfil.
     *
     * @param profileId Identificador del perfil del usuario
     * @throws InvalidProfileException
     * @throws EmptyMenuException
     */
    execute(profileId: number): Promise<MenuItem[]> {

        // Regla del negocio: el perfil es obligatorio
        if (!profileId) {
            throw new InvalidProfileException(profileId);
        }

        // Llamada al puerto de salida
        return this.repository.cargarMenu(profileId)
            .then(menu => {

                // Regla del negocio: el menú no puede estar vacío
                if (!menu || menu.length === 0) {
                    throw new EmptyMenuException();
                }

                return menu;
            });
    }
}
