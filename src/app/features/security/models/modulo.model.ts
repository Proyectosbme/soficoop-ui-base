/**
 * Modelo de dominio: Módulo
 *
 * Representa un módulo dentro del contexto de Seguridad.
 * No depende de Angular ni de infraestructura.
 */
export class Modulo {
  constructor(
    public nombre: string,
    public id?: number
  ) {}
}
