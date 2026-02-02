import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Perfil } from '@security/models/perfil.model';
import { SecurityApiClient } from '@security/api/security-api.client';
import { PerfilRequestDTO, PerfilResponseDTO } from '@security/dto/security.dto';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  constructor(private readonly api: SecurityApiClient) {}

  crear(perfil: Perfil): Promise<Perfil> {
    const request: PerfilRequestDTO = { nombre: perfil.nombre };
    return this.api.createPerfil(request)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw this.toUserError(error, 'No se pudo crear el perfil.'); });
  }

  buscarPorId(id: string): Promise<Perfil> {
    return this.api.getPerfilById(id)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw this.toUserError(error, 'No se encontró el perfil.'); });
  }

  actualizar(id: string, perfil: Perfil): Promise<Perfil> {
    const request: PerfilRequestDTO = { nombre: perfil.nombre };
    return this.api.updatePerfil(id, request)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw this.toUserError(error, 'No se pudo actualizar el perfil.'); });
  }

  eliminar(id: string): Promise<void> {
    return this.api.deletePerfil(id)
      .catch((error) => { throw this.toUserError(error, 'No se pudo eliminar el perfil.'); });
  }

  private mapToDomain(response: PerfilResponseDTO): Perfil {
    return { id: response.id, nombre: response.nombre };
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
