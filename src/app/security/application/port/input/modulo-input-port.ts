/**
 * PUERTO DE ENTRADA (Input Port)
 *
 * Define lo que el caso de uso expone hacia el exterior.
 */
import { Modulo } from 'app/security/domain/modulo.model';

export interface ModuloInputPort {
  crear(modulo: Modulo): Promise<Modulo>;
  obtenerTodas(): Promise<Modulo[]>;
  buscarPorId(id: number): Promise<Modulo>;
  actualizar(id: number, modulo: Modulo): Promise<Modulo>;
  eliminar(id: number): Promise<void>;
}
