import { Injectable } from '@angular/core';
import { LoadMenuUseCase } from '@application/usecase/load-menu.usecase';
import { MenuItem } from '@domain/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {

  constructor(private loadMenu: LoadMenuUseCase) {}

  load(codPerfil: number): Promise<MenuItem[]> {
    return this.loadMenu.execute(codPerfil);
  }
}
