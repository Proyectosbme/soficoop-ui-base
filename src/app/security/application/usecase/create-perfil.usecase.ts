import { PerfilRepositoryPort } from 'app/security/application/port/output/perfil-repository-port';
import { Perfil } from 'app/security/domain/perfil.model';
import { InvalidPerfilNameException } from 'app/security/domain/security.exceptions';

export class CreatePerfilUseCase {
  constructor(private readonly repository: PerfilRepositoryPort) { }

  execute(perfil: Perfil): Promise<Perfil> {
    const nombre = (perfil?.nombre ?? '').trim();
    if (!nombre) {
      throw new InvalidPerfilNameException();
    }
    return this.repository.crear({ ...perfil, nombre });
  }
}
