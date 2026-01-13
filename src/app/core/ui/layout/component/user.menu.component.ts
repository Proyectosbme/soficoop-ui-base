import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-user-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, MenuModule, AvatarModule],
    templateUrl: './user.menu.component.html'
})
export class UserMenuComponent {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Ronald Sánchez',
                items: [
                    {
                        label: 'Configuración',
                        icon: 'pi pi-cog',
                        routerLink: ['/settings'] // Placeholder for settings page
                    },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            console.log('Cerrar sesión...');
                            // Implement actual logout logic here
                        }
                    }
                ]
            }
        ];
    }
}
