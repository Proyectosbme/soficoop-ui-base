import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from '@security/models/menu.model';
import { SecurityApiClient } from '@security/api/security-api.client';

@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(private readonly api: SecurityApiClient) {}

    cargarMenu(codPerfil: number): Promise<MenuItem[]> {
        return this.api.getMenu(codPerfil)
            .catch((error) => { throw this.toUserError(error, 'No se pudo cargar el menú.'); });
    }

    private toUserError(error: unknown, fallback: string): Error {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
                return new Error('No se puede conectar al servicio. Verifica tu conexión.');
            }
            if (error.status === 404) {
                return new Error('No encontrado.');
            }
            if (error.status === 400) {
                return new Error('Solicitud inválida.');
            }
            if (error.status >= 500) {
                return new Error('Error interno del servidor.');
            }
        }
        return new Error(fallback);
    }
}
