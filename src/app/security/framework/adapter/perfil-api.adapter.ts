import { PerfilRepositoryPort } from '@security/application/port/output/perfil-repository-port';
import { Perfil } from '@security/domain/perfil.model';
import { SecurityApiClient } from '../api/security-api.client';
import { mapPerfilToDomain, mapPerfilToRequest } from '../mapper/perfil.mapper';

export class PerfilApiAdapter implements PerfilRepositoryPort {
  constructor(private readonly securityApiClient: SecurityApiClient) { }

  crear(perfil: Perfil): Promise<Perfil> {
    const request = mapPerfilToRequest(perfil);
    return this.securityApiClient.createPerfil(request)
      .then((response) => mapPerfilToDomain(response));
  }

  buscarPorId(id: string): Promise<Perfil> {
    return this.securityApiClient.getPerfilById(id)
      .then((response) => mapPerfilToDomain(response));
  }

  actualizar(id: string, perfil: Perfil): Promise<Perfil> {
    const request = mapPerfilToRequest(perfil);
    return this.securityApiClient.updatePerfil(id, request)
      .then((response) => mapPerfilToDomain(response));
  }

  eliminar(id: string): Promise<void> {
    return this.securityApiClient.deletePerfil(id);
  }

  
}
