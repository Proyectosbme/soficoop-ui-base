import { Provider } from '@angular/core';
import { SecurityApiClient } from '@security/api/security-api.client';
import { MenuService } from '@security/services/menu-application.service';
import { ModuloService } from '@security/services/modulo-application.service';
import { PerfilService } from '@security/services/perfil-application.service';

export const SECURITY_PROVIDERS: Provider[] = [
  SecurityApiClient,
  MenuService,
  ModuloService,
  PerfilService
];
