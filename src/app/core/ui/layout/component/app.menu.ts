import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
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
        private readonly menuStateService: MenuStateService
    ) { }

    ngOnInit(): void {
        this.loadMenuFromJson();

        // TODO: Cuando exista login, volver a usar el servicio.
        // const codperfil: number = 1;
        // const cached = this.menuService.getCachedMenu(codperfil);
        // if (cached && cached.length) {
        //     this.model = cached;
        //     this.menuStateService.setMenu(cached);
        //     return;
        // }
        // this.menuService.cargarMenu(codperfil).then(menu => {
        //     this.model = menu;
        //     this.menuStateService.setMenu(menu);
        // });
    }

    private async loadMenuFromJson(): Promise<void> {
        try {
            const response = await fetch('/assets/menu/menu.json');
            const menu = (await response.json()) as MenuItem[];
            this.model = menu;
            this.menuStateService.setMenu(menu);
        } catch {
            this.model = [];
            this.menuStateService.setMenu([]);
        }
    }


}
