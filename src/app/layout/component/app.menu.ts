import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.component.html'
})
export class AppMenu implements OnInit {

    model: MenuItem[] = [];

 private readonly MENU_URL = 'http://localhost:9095/menu/170';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<MenuItem[]>(this.MENU_URL)
            .subscribe({
                next: data => this.model = data,
                error: err => console.error('Error cargando menú dinámico', err)
            });
    }
}
