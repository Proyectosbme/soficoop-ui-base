import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuRepositoryPort } from 'app/security/application/port/output/menu-repository-port';
import { MenuItem } from 'app/security/domain/menu.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MenuApiService implements MenuRepositoryPort {

  private readonly baseUrl = '/api/menu';

  constructor(
    private readonly http: HttpClient
  ) {}

 cargarMenu(codPerfil: number): Promise<MenuItem[]> {
    return firstValueFrom(
      this.http.get<MenuItem[]>(`${this.baseUrl}/${codPerfil}`)
    );
  }
}
