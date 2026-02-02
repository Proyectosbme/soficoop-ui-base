import { ModuloRepositoryPort } from 'app/security/application/port/output/modulo-repository-port';
import { InvalidModuloIdException } from 'app/security/domain/security.exceptions';

/**
 * Caso de uso: Eliminar módulo.
 */
export class DeleteModuloUseCase {
  constructor(
    private readonly repository: ModuloRepositoryPort
  ) { }

  execute(id: number): Promise<void> {
    if (!id) {
      throw new InvalidModuloIdException(id);
    }

    return this.repository.eliminar(id);
  }
}
