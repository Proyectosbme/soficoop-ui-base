
import { MenuRepositoryPort } from 'app/security/application/port/output/menu-repository-port';
import { MenuItem } from 'app/security/domain/menu.model';
import { SecurityApiClient } from '../api/security-api.client';


export class MenuApiAdapter implements MenuRepositoryPort {

    constructor(private readonly securityApiClient: SecurityApiClient) { }


    cargarMenu(codPerfil: number): Promise<MenuItem[]> {
        return this.securityApiClient.getMenu(codPerfil);
    }

}
