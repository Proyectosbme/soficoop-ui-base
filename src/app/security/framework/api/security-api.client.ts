import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from '../../domain/menu.model';

@Injectable()
export class SecurityApiClient {

  private readonly BASE_URL = 'http://192.168.1.132:8085';

  constructor(
    private readonly http: HttpClient
  ) {}

  getMenu(codPerfil: number) {
    return firstValueFrom(
      this.http.get<MenuItem[]>(`${this.BASE_URL}/menu-perfil/jerarquico/perfil/${codPerfil}`)
    );
  }

  // futuras llamadas
  // getPerfiles()
  // getModulos()
  // assignPerfilModulo(...)
}
