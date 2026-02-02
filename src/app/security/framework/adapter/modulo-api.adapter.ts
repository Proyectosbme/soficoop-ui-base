import { ModuloRepositoryPort } from '@security/application/port/output/modulo-repository-port';
import { Modulo } from '@security/domain/modulo.model';
import { SecurityApiClient } from '../api/security-api.client';
import { mapModuloToDomain, mapModuloToRequest } from '../mapper/modulo.mapper';

export class ModuloApiAdapter implements ModuloRepositoryPort {
  constructor(private readonly securityApiClient: SecurityApiClient) { }

  crear(modulo: Modulo): Promise<Modulo> {
    const request = mapModuloToRequest(modulo);
    return this.securityApiClient.createModulo(request)
      .then((response) => mapModuloToDomain(response));
  }

  obtenerTodas(): Promise<Modulo[]> {
    return this.securityApiClient.getModulos()
      .then((response) => response.map((item) => mapModuloToDomain(item)));
  }

  buscarPorId(id: number): Promise<Modulo> {
    return this.securityApiClient.getModuloById(id)
      .then((response) => mapModuloToDomain(response));
  }

  actualizar(id: number, modulo: Modulo): Promise<Modulo> {
    const request = mapModuloToRequest(modulo);
    return this.securityApiClient.updateModulo(id, request)
      .then((response) => mapModuloToDomain(response));
  }

  eliminar(id: number): Promise<void> {
    return this.securityApiClient.deleteModulo(id);
  }

  
}
