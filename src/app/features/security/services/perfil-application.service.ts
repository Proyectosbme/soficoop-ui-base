import { Injectable } from '@angular/core';
import { AppErrors } from '@shared/errors/app-errors';
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
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo crear el perfil.'); });
  }

  buscarPorId(id: string): Promise<Perfil> {
    return this.api.getPerfilById(id)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se encontró el perfil.'); });
  }

  actualizar(id: string, perfil: Perfil): Promise<Perfil> {
    const request: PerfilRequestDTO = { nombre: perfil.nombre };
    return this.api.updatePerfil(id, request)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo actualizar el perfil.'); });
  }

  eliminar(id: string): Promise<void> {
    return this.api.deletePerfil(id)
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo eliminar el perfil.'); });
  }

  private mapToDomain(response: PerfilResponseDTO): Perfil {
    return { id: response.id, nombre: response.nombre };
  }

}
