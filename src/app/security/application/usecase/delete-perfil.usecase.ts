import { PerfilRepositoryPort } from 'app/security/application/port/output/perfil-repository-port';
import { InvalidPerfilIdException } from 'app/security/domain/security.exceptions';

export class DeletePerfilUseCase {
  constructor(private readonly repository: PerfilRepositoryPort) { }

  execute(id: string): Promise<void> {
    if (!id) {
      throw new InvalidPerfilIdException(id);
    }
    return this.repository.eliminar(id);
  }
}
