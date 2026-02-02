import { ModuloRepositoryPort } from 'app/security/application/port/output/modulo-repository-port';
import { Modulo } from 'app/security/domain/modulo.model';
import { InvalidModuloIdException } from 'app/security/domain/security.exceptions';

/**
 * Caso de uso: Buscar módulo por ID.
 */
export class GetModuloByIdUseCase {
  constructor(
    private readonly repository: ModuloRepositoryPort
  ) { }

  execute(id: number): Promise<Modulo> {
    if (!id) {
      throw new InvalidModuloIdException(id);
    }

    return this.repository.buscarPorId(id);
  }
}
