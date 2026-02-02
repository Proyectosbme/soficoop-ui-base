import { Provider } from '@angular/core';
import { MENU_INPUT_PORT } from '@security/application/port/input/menu-input.token';
import { MODULO_INPUT_PORT } from '@security/application/port/input/modulo-input.token';
import { MENU_REPOSITORY_PORT } from '@security/application/port/output/menu-repository.token';
import { MODULO_REPOSITORY_PORT } from '@security/application/port/output/modulo-repository.token';
import { MenuApiAdapter } from '@security/framework/adapter/menu-api.adapter';
import { ModuloApiAdapter } from '@security/framework/adapter/modulo-api.adapter';
import { PerfilApiAdapter } from '@security/framework/adapter/perfil-api.adapter';
import { LoadMenuUseCase } from '@security/application/usecase/load-menu.usecase';
import { MenuService } from '@security/application/service/menu-application.service';
import { MenuRepositoryPort } from '@security/application/port/output/menu-repository-port';
import { SecurityApiClient } from '../api/security-api.client';
import { CreateModuloUseCase } from '@security/application/usecase/create-modulo.usecase';
import { GetModuloByIdUseCase } from '@security/application/usecase/get-modulo-by-id.usecase';
import { ModuloRepositoryPort } from '@security/application/port/output/modulo-repository-port';
import { ModuloService } from '@security/application/service/modulo-application.service';
import { GetModulosUseCase } from '@security/application/usecase/get-modulos.usecase';
import { UpdateModuloUseCase } from '@security/application/usecase/update-modulo.usecase';
import { DeleteModuloUseCase } from '@security/application/usecase/delete-modulo.usecase';
import { PERFIL_INPUT_PORT } from '@security/application/port/input/perfil-input.token';
import { PERFIL_REPOSITORY_PORT } from '@security/application/port/output/perfil-repository.token';
import { PerfilRepositoryPort } from '@security/application/port/output/perfil-repository-port';
import { CreatePerfilUseCase } from '@security/application/usecase/create-perfil.usecase';
import { GetPerfilByIdUseCase } from '@security/application/usecase/get-perfil-by-id.usecase';
import { UpdatePerfilUseCase } from '@security/application/usecase/update-perfil.usecase';
import { DeletePerfilUseCase } from '@security/application/usecase/delete-perfil.usecase';
import { PerfilService } from '@security/application/service/perfil-application.service';

export const SECURITY_PROVIDERS: Provider[] = [

    // 🔹 Cliente HTTP (infraestructura)
    SecurityApiClient,
    // OutputPort
    {
        provide: MENU_REPOSITORY_PORT,
        useFactory: (api: SecurityApiClient) =>
            new MenuApiAdapter(api),
        deps: [SecurityApiClient]
    },
    {
        provide: MODULO_REPOSITORY_PORT,
        useFactory: (api: SecurityApiClient) =>
            new ModuloApiAdapter(api),
        deps: [SecurityApiClient]
    },
    {
        provide: PERFIL_REPOSITORY_PORT,
        useFactory: (api: SecurityApiClient) =>
            new PerfilApiAdapter(api),
        deps: [SecurityApiClient]
    },

    // UseCase
    {
        provide: LoadMenuUseCase,
        useFactory: (repo: MenuRepositoryPort) =>
            new LoadMenuUseCase(repo),
        deps: [MENU_REPOSITORY_PORT]
    },
    {
        provide: CreateModuloUseCase,
        useFactory: (repo: ModuloRepositoryPort) =>
            new CreateModuloUseCase(repo),
        deps: [MODULO_REPOSITORY_PORT]
    },
    {
        provide: GetModulosUseCase,
        useFactory: (repo: ModuloRepositoryPort) =>
            new GetModulosUseCase(repo),
        deps: [MODULO_REPOSITORY_PORT]
    },
    {
        provide: GetModuloByIdUseCase,
        useFactory: (repo: ModuloRepositoryPort) =>
            new GetModuloByIdUseCase(repo),
        deps: [MODULO_REPOSITORY_PORT]
    },
    {
        provide: UpdateModuloUseCase,
        useFactory: (repo: ModuloRepositoryPort) =>
            new UpdateModuloUseCase(repo),
        deps: [MODULO_REPOSITORY_PORT]
    },
    {
        provide: DeleteModuloUseCase,
        useFactory: (repo: ModuloRepositoryPort) =>
            new DeleteModuloUseCase(repo),
        deps: [MODULO_REPOSITORY_PORT]
    },
    {
        provide: CreatePerfilUseCase,
        useFactory: (repo: PerfilRepositoryPort) =>
            new CreatePerfilUseCase(repo),
        deps: [PERFIL_REPOSITORY_PORT]
    },
    {
        provide: GetPerfilByIdUseCase,
        useFactory: (repo: PerfilRepositoryPort) =>
            new GetPerfilByIdUseCase(repo),
        deps: [PERFIL_REPOSITORY_PORT]
    },
    {
        provide: UpdatePerfilUseCase,
        useFactory: (repo: PerfilRepositoryPort) =>
            new UpdatePerfilUseCase(repo),
        deps: [PERFIL_REPOSITORY_PORT]
    },
    {
        provide: DeletePerfilUseCase,
        useFactory: (repo: PerfilRepositoryPort) =>
            new DeletePerfilUseCase(repo),
        deps: [PERFIL_REPOSITORY_PORT]
    },

    // InputPort
    {
        provide: MENU_INPUT_PORT,
        useFactory: (uc: LoadMenuUseCase) =>
            new MenuService(uc),
        deps: [LoadMenuUseCase]
    },
    {
        provide: MODULO_INPUT_PORT,
        useFactory: (
            createUc: CreateModuloUseCase,
            getUc: GetModulosUseCase,
            getByIdUc: GetModuloByIdUseCase,
            updateUc: UpdateModuloUseCase,
            deleteUc: DeleteModuloUseCase
        ) => new ModuloService(createUc, getUc, getByIdUc, updateUc, deleteUc),
        deps: [CreateModuloUseCase, GetModulosUseCase, GetModuloByIdUseCase, UpdateModuloUseCase, DeleteModuloUseCase]
    },
    {
        provide: PERFIL_INPUT_PORT,
        useFactory: (
            createUc: CreatePerfilUseCase,
            getUc: GetPerfilByIdUseCase,
            updateUc: UpdatePerfilUseCase,
            deleteUc: DeletePerfilUseCase
        ) => new PerfilService(createUc, getUc, updateUc, deleteUc),
        deps: [CreatePerfilUseCase, GetPerfilByIdUseCase, UpdatePerfilUseCase, DeletePerfilUseCase]
    }
];
