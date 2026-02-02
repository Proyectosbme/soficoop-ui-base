/**
 * PUERTO DE SALIDA: ModuloRepository
 *
 * Define lo que la aplicación necesita del mundo exterior.
 */
import { Modulo } from 'app/security/domain/modulo.model';

export interface ModuloRepositoryPort {
  crear(modulo: Modulo): Promise<Modulo>;
  obtenerTodas(): Promise<Modulo[]>;
  buscarPorId(id: number): Promise<Modulo>;
  actualizar(id: number, modulo: Modulo): Promise<Modulo>;
  eliminar(id: number): Promise<void>;
}
