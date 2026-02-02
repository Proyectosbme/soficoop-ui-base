import { PerfilRepositoryPort } from 'app/security/application/port/output/perfil-repository-port';
import { Perfil } from 'app/security/domain/perfil.model';
import { InvalidPerfilIdException } from 'app/security/domain/security.exceptions';

export class GetPerfilByIdUseCase {
  constructor(private readonly repository: PerfilRepositoryPort) { }

  execute(id: string): Promise<Perfil> {
    if (!id) {
      throw new InvalidPerfilIdException(id);
    }
    return this.repository.buscarPorId(id);
  }
}
