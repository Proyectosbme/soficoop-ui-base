import { MenuInputPort } from "app/security/application/port/input/menu-input-port";
import { MenuItem } from "app/security/domain/menu.model";
import { LoadMenuUseCase } from '../usecase/load-menu.usecase';



export class MenuService implements MenuInputPort {

    constructor(
        private readonly loadMenuUseCase: LoadMenuUseCase
    ) { }

    cargarMenu(codPerfil: number): Promise<MenuItem[]> {
        return this.loadMenuUseCase.execute(codPerfil);
    }

}
