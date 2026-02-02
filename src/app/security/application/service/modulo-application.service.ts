import { ModuloInputPort } from 'app/security/application/port/input/modulo-input-port';
import { Modulo } from 'app/security/domain/modulo.model';
import { CreateModuloUseCase } from '../usecase/create-modulo.usecase';
import { GetModulosUseCase } from '../usecase/get-modulos.usecase';
import { GetModuloByIdUseCase } from '../usecase/get-modulo-by-id.usecase';
import { UpdateModuloUseCase } from '../usecase/update-modulo.usecase';
import { DeleteModuloUseCase } from '../usecase/delete-modulo.usecase';

export class ModuloService implements ModuloInputPort {
  constructor(
    private readonly createModuloUseCase: CreateModuloUseCase,
    private readonly getModulosUseCase: GetModulosUseCase,
    private readonly getModuloByIdUseCase: GetModuloByIdUseCase,
    private readonly updateModuloUseCase: UpdateModuloUseCase,
    private readonly deleteModuloUseCase: DeleteModuloUseCase
  ) { }

  crear(modulo: Modulo): Promise<Modulo> {
    return this.createModuloUseCase.execute(modulo);
  }

  obtenerTodas(): Promise<Modulo[]> {
    return this.getModulosUseCase.execute();
  }

  buscarPorId(id: number): Promise<Modulo> {
    return this.getModuloByIdUseCase.execute(id);
  }

  actualizar(id: number, modulo: Modulo): Promise<Modulo> {
    return this.updateModuloUseCase.execute(id, modulo);
  }

  eliminar(id: number): Promise<void> {
    return this.deleteModuloUseCase.execute(id);
  }
}
