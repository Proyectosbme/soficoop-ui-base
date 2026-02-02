import { Injectable } from '@angular/core';
import { AppErrors } from '@shared/errors/app-errors';
import { MenuItem } from '@security/models/menu.model';
import { SecurityApiClient } from '@security/api/security-api.client';

@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(private readonly api: SecurityApiClient) {}

    private getCacheKey(codPerfil: number): string {
        return `menu-cache-${codPerfil}`;
    }

    getCachedMenu(codPerfil: number): MenuItem[] | null {
        try {
            const raw = localStorage.getItem(this.getCacheKey(codPerfil));
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw) as MenuItem[];
            return Array.isArray(parsed) ? parsed : null;
        } catch {
            return null;
        }
    }

    setCachedMenu(codPerfil: number, menu: MenuItem[]): void {
        try {
            localStorage.setItem(this.getCacheKey(codPerfil), JSON.stringify(menu));
        } catch {
            // Ignorar fallos de almacenamiento
        }
    }

    cargarMenu(codPerfil: number): Promise<MenuItem[]> {
        return this.api.getMenu(codPerfil)
            .then((menu) => {
                this.setCachedMenu(codPerfil, menu);
                return menu;
            })
            .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo cargar el menú.'); });
    }

}
