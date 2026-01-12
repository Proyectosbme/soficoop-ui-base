import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuRepository } from '@application/port/output/menuRepository';
import { MenuItem } from '@domain/menu.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuApiService implements MenuRepository {

    private readonly BASE_URL = 'http://localhost:9095/menu';

    constructor(private readonly http: HttpClient) { }

    cargarMenu(codPerfil: number): Promise<MenuItem[]> {
        return firstValueFrom(
            this.http.get<MenuItem[]>(`${this.BASE_URL}/${codPerfil}`)
        );
    }
}
