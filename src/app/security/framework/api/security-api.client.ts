import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SecurityApiClient {

  private readonly BASE_URL = 'http://localhost:9095';

  constructor(
    private readonly http: HttpClient
  ) {}

  getMenu(codPerfil: number) {
    return firstValueFrom(
      this.http.get<any[]>(`${this.BASE_URL}/menu/${codPerfil}`)
    );
  }

  // futuras llamadas
  // getPerfiles()
  // getModulos()
  // assignPerfilModulo(...)
}
