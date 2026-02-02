import { Injectable } from '@angular/core';
import { AppErrors } from '@shared/errors/app-errors';
import { Modulo } from '@security/models/modulo.model';
import { SecurityApiClient } from '@security/api/security-api.client';
import { ModuloRequestDTO, ModuloResponseDTO } from '@security/dto/security.dto';

@Injectable({ providedIn: 'root' })
export class ModuloService {
  constructor(private readonly api: SecurityApiClient) {}

  crear(modulo: Modulo): Promise<Modulo> {
    const request: ModuloRequestDTO = { nombre: modulo.nombre };
    return this.api.createModulo(request)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo crear el módulo.'); });
  }

  obtenerTodas(): Promise<Modulo[]> {
    return this.api.getModulos()
      .then((items) => items.map((item) => this.mapToDomain(item)))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudieron cargar los módulos.'); });
  }

  buscarPorId(id: number): Promise<Modulo> {
    return this.api.getModuloById(id)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se encontró el módulo.'); });
  }

  actualizar(id: number, modulo: Modulo): Promise<Modulo> {
    const request: ModuloRequestDTO = { nombre: modulo.nombre };
    return this.api.updateModulo(id, request)
      .then((response) => this.mapToDomain(response))
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo actualizar el módulo.'); });
  }

  eliminar(id: number): Promise<void> {
    return this.api.deleteModulo(id)
      .catch((error) => { throw AppErrors.fromHttp(error, 'No se pudo eliminar el módulo.'); });
  }

  private mapToDomain(response: ModuloResponseDTO): Modulo {
    return { id: response.id, nombre: response.nombre };
  }

}
