/**
 * Excepción base del dominio de Seguridad.
 *
 * Representa una violación de una regla del negocio,
 * no un error técnico (HTTP, red, timeout, etc.).
 *
 * Vive en el dominio.
 * No depende de Angular.
 */
export abstract class SecurityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityException';
  }
}

/**
 * Se lanza cuando el perfil enviado al sistema no es válido.
 *
 * Regla del negocio:
 * - El sistema NO puede operar sin un perfil válido.
 *
 * Esta validación NO es técnica.
 * Debe ser evaluada por el caso de uso.
 */
export class InvalidProfileException extends SecurityException {
  constructor(profileId: number) {
    super(`El perfil '${profileId}' no es válido.`);
    this.name = 'InvalidProfileException';
  }
}

/**
 * Se lanza cuando, según las reglas del negocio,
 * un usuario no tiene opciones de menú disponibles.
 *
 * No significa error técnico.
 * Es una condición válida del dominio.
 */
export class EmptyMenuException extends SecurityException {
  constructor() {
    super('No existen opciones de menú disponibles para este perfil.');
    this.name = 'EmptyMenuException';
  }
}

/**
 * Se lanza cuando el nombre del módulo es inválido.
 */
export class InvalidModuloNameException extends SecurityException {
  constructor() {
    super('El nombre del módulo es obligatorio.');
    this.name = 'InvalidModuloNameException';
  }
}

/**
 * Se lanza cuando el id del módulo es inválido.
 */
export class InvalidModuloIdException extends SecurityException {
  constructor(id: number) {
    super(`El id del módulo '${id}' no es válido.`);
    this.name = 'InvalidModuloIdException';
  }
}

/**
 * Se lanza cuando el nombre del perfil es inválido.
 */
export class InvalidPerfilNameException extends SecurityException {
  constructor() {
    super('El nombre del perfil es obligatorio.');
    this.name = 'InvalidPerfilNameException';
  }
}

/**
 * Se lanza cuando el id del perfil es inválido.
 */
export class InvalidPerfilIdException extends SecurityException {
  constructor(id: string) {
    super(`El id del perfil '${id}' no es válido.`);
    this.name = 'InvalidPerfilIdException';
  }
}
