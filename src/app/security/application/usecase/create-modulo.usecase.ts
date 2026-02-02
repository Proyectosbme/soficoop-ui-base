import { ModuloRepositoryPort } from 'app/security/application/port/output/modulo-repository-port';
import { Modulo } from 'app/security/domain/modulo.model';
import { InvalidModuloNameException } from 'app/security/domain/security.exceptions';

/**
 * Caso de uso: Crear módulo.
 *
 * Orquesta el flujo y valida reglas del negocio.
 */
export class CreateModuloUseCase {
  constructor(
    private readonly repository: ModuloRepositoryPort
  ) { }

  execute(modulo: Modulo): Promise<Modulo> {
    const nombre = (modulo?.nombre ?? '').trim();

    if (!nombre) {
      throw new InvalidModuloNameException();
    }

    return this.repository.crear({ ...modulo, nombre });
  }
}
