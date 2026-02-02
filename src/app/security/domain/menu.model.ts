/**
 * Modelo de dominio (Value Object)
 * Representa una opción de menú dentro del contexto de Seguridad.
 *
 * ⚠️ No contiene lógica.
 * ⚠️ No depende de Angular ni de infraestructura.
 * ⚠️ Es usado por Application y Framework.
 */
export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  items?: MenuItem[];
}

