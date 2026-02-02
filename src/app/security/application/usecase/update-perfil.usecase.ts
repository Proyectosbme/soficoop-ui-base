import { PerfilRepositoryPort } from 'app/security/application/port/output/perfil-repository-port';
import { Perfil } from 'app/security/domain/perfil.model';
import { InvalidPerfilIdException, InvalidPerfilNameException } from 'app/security/domain/security.exceptions';

export class UpdatePerfilUseCase {
  constructor(private readonly repository: PerfilRepositoryPort) { }

  execute(id: string, perfil: Perfil): Promise<Perfil> {
    if (!id) {
      throw new InvalidPerfilIdException(id);
    }
    const nombre = (perfil?.nombre ?? '').trim();
    if (!nombre) {
      throw new InvalidPerfilNameException();
    }
    return this.repository.actualizar(id, { ...perfil, nombre });
  }
}
