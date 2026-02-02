/**
 * Modelo de dominio (Value Object)
 * Representa una opción de menú dentro del contexto de Seguridad.
 *
 * ⚠️ No contiene lógica.
 * ⚠️ No depende de Angular ni de infraestructura.
 * ⚠️ Es usado por Application y Framework.
 */
export class MenuItem {
  constructor(
    public label: string,
    public icon?: string,
    public route?: string,
    public items?: MenuItem[]
  ) {}
}

