import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MenuService } from '@security/services/menu-application.service';
import { MenuStateService } from '@security/services/menu-state.service';


@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.component.html'
})
export class AppMenu implements OnInit {

    model: MenuItem[] = [];
    constructor(
        private readonly menuService: MenuService,
        private readonly menuStateService: MenuStateService
    ) { }

    ngOnInit(): void {
        let codperfil: number = 1;
        this.menuService.cargarMenu(codperfil).then(menu => {
            this.model = menu;
            this.menuStateService.setMenu(menu);
        });
    }


}
