/**
 * PUERTO DE ENTRADA (Input Port)
 */
import { Perfil } from 'app/security/domain/perfil.model';

export interface PerfilInputPort {
  crear(perfil: Perfil): Promise<Perfil>;
  buscarPorId(id: string): Promise<Perfil>;
  actualizar(id: string, perfil: Perfil): Promise<Perfil>;
  eliminar(id: string): Promise<void>;
}
