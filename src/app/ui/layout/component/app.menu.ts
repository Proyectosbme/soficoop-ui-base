import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MenuService } from '@framework/security/menu.service';
import {  EmptyMenuException,  InvalidProfileException,  SecurityException} from '@domain/security.exceptions';


@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.component.html'
})
export class AppMenu implements OnInit {

    model: MenuItem[] = [];

  constructor(private readonly menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

private async loadMenu(): Promise<void> {
  try {
    const codPerfil = 170;
    this.model = await this.menuService.load(codPerfil);

  } catch (e) {

    if (e instanceof InvalidProfileException) {
      console.warn(e.message);
      return;
    }

    if (e instanceof EmptyMenuException) {
      console.info(e.message);
      this.model = [];
      return;
    }

    if (e instanceof SecurityException) {
      console.error(e.message);
      return;
    }

    console.error('Error técnico inesperado', e);
  }
}

}
