import { ModuloRepositoryPort } from 'app/security/application/port/output/modulo-repository-port';
import { Modulo } from 'app/security/domain/modulo.model';
import { InvalidModuloIdException, InvalidModuloNameException } from 'app/security/domain/security.exceptions';

/**
 * Caso de uso: Actualizar módulo.
 */
export class UpdateModuloUseCase {
  constructor(
    private readonly repository: ModuloRepositoryPort
  ) { }

  execute(id: number, modulo: Modulo): Promise<Modulo> {
    if (!id) {
      throw new InvalidModuloIdException(id);
    }

    const nombre = (modulo?.nombre ?? '').trim();
    if (!nombre) {
      throw new InvalidModuloNameException();
    }

    return this.repository.actualizar(id, { ...modulo, nombre });
  }
}
