import { PerfilInputPort } from 'app/security/application/port/input/perfil-input-port';
import { Perfil } from 'app/security/domain/perfil.model';
import { CreatePerfilUseCase } from '../usecase/create-perfil.usecase';
import { GetPerfilByIdUseCase } from '../usecase/get-perfil-by-id.usecase';
import { UpdatePerfilUseCase } from '../usecase/update-perfil.usecase';
import { DeletePerfilUseCase } from '../usecase/delete-perfil.usecase';

export class PerfilService implements PerfilInputPort {
  constructor(
    private readonly createPerfilUseCase: CreatePerfilUseCase,
    private readonly getPerfilByIdUseCase: GetPerfilByIdUseCase,
    private readonly updatePerfilUseCase: UpdatePerfilUseCase,
    private readonly deletePerfilUseCase: DeletePerfilUseCase
  ) { }

  crear(perfil: Perfil): Promise<Perfil> {
    return this.createPerfilUseCase.execute(perfil);
  }

  buscarPorId(id: string): Promise<Perfil> {
    return this.getPerfilByIdUseCase.execute(id);
  }

  actualizar(id: string, perfil: Perfil): Promise<Perfil> {
    return this.updatePerfilUseCase.execute(id, perfil);
  }

  eliminar(id: string): Promise<void> {
    return this.deletePerfilUseCase.execute(id);
  }
}
