import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MENU_INPUT_PORT } from 'app/security/application/port/input/menu-input.token';
import { MenuInputPort } from 'app/security/application/port/input/menu-input-port';
import { MenuStateService } from '@security/ui/service/menu-state.service';


@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.component.html'
})
export class AppMenu implements OnInit {

    model: MenuItem[] = [];
    constructor(
        @Inject(MENU_INPUT_PORT)
        private readonly menuInputPort: MenuInputPort,
        private readonly menuStateService: MenuStateService
    ) { }

    ngOnInit(): void {
        let codperfil: number = 1;
        this.menuInputPort.cargarMenu(codperfil).then(menu => {
            this.model = menu;
            this.menuStateService.setMenu(menu);
        });
    }


}
