import { ModuloRepositoryPort } from 'app/security/application/port/output/modulo-repository-port';
import { Modulo } from 'app/security/domain/modulo.model';

/**
 * Caso de uso: Obtener todos los módulos.
 */
export class GetModulosUseCase {
  constructor(
    private readonly repository: ModuloRepositoryPort
  ) { }

  execute(): Promise<Modulo[]> {
    return this.repository.obtenerTodas();
  }
}
