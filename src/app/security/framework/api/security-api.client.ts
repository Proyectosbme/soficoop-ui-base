import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from '../../domain/menu.model';
import { ModuloRequestDTO, ModuloResponseDTO, PerfilRequestDTO, PerfilResponseDTO } from '../dto/security.dto';

@Injectable()
export class SecurityApiClient {

  private readonly BASE_URL = 'http://localhost:8085';

  constructor(
    private readonly http: HttpClient
  ) {}

  getMenu(codPerfil: number) {
    return firstValueFrom(
      this.http.get<MenuItem[]>(`${this.BASE_URL}/menu-perfil/jerarquico/perfil/${codPerfil}`)
    );
  }

  createModulo(dto: ModuloRequestDTO) {
    return firstValueFrom(
      this.http.post<ModuloResponseDTO>(`${this.BASE_URL}/modulo`, dto)
    );
  }

  getModulos() {
    return firstValueFrom(
      this.http.get<ModuloResponseDTO[]>(`${this.BASE_URL}/modulo`)
    );
  }

  updateModulo(id: number, dto: ModuloRequestDTO) {
    return firstValueFrom(
      this.http.put<ModuloResponseDTO>(`${this.BASE_URL}/modulo/${id}`, dto)
    );
  }

  deleteModulo(id: number) {
    return firstValueFrom(
      this.http.delete<void>(`${this.BASE_URL}/modulo/${id}`)
    );
  }

  getModuloById(id: number) {
    return firstValueFrom(
      this.http.get<ModuloResponseDTO>(`${this.BASE_URL}/modulo/${id}`)
    );
  }

  createPerfil(dto: PerfilRequestDTO) {
    return firstValueFrom(
      this.http.post<PerfilResponseDTO>(`${this.BASE_URL}/perfil`, dto)
    );
  }

  getPerfilById(id: string) {
    return firstValueFrom(
      this.http.get<PerfilResponseDTO>(`${this.BASE_URL}/perfil/${id}`)
    );
  }

  updatePerfil(id: string, dto: PerfilRequestDTO) {
    return firstValueFrom(
      this.http.put<PerfilResponseDTO>(`${this.BASE_URL}/perfil/${id}`, dto)
    );
  }

  deletePerfil(id: string) {
    return firstValueFrom(
      this.http.delete<void>(`${this.BASE_URL}/perfil/${id}`)
    );
  }

  // futuras llamadas
  // getPerfiles()
  // getModulos()
  // assignPerfilModulo(...)
}
