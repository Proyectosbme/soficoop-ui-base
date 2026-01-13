import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MENU_INPUT_PORT } from 'app/security/application/port/input/menu-input.token';
import { MenuInputPort } from 'app/security/application/port/input/menu-input-port';


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
        private readonly menuInputPort: MenuInputPort
    ) { }

    ngOnInit(): void {
        let codperfil: number = 170;
        this.menuInputPort.cargarMenu(codperfil).then(menu => {
            this.model = menu;
        });
    }


}
