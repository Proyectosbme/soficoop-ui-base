import { Modulo } from '@security/domain/modulo.model';
import { ModuloRequestDTO, ModuloResponseDTO } from '../dto/security.dto';

export const mapModuloToDomain = (response: ModuloResponseDTO): Modulo => ({
  id: response.id,
  nombre: response.nombre
});

export const mapModuloToRequest = (modulo: Modulo): ModuloRequestDTO => ({
  nombre: modulo.nombre
});
