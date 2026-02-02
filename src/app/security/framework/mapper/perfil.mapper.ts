import { Perfil } from '@security/domain/perfil.model';
import { PerfilRequestDTO, PerfilResponseDTO } from '../dto/security.dto';

export const mapPerfilToDomain = (response: PerfilResponseDTO): Perfil => ({
  id: response.id,
  nombre: response.nombre
});

export const mapPerfilToRequest = (perfil: Perfil): PerfilRequestDTO => ({
  nombre: perfil.nombre
});
