import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { MenuItem as PrimeMenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuItem as DomainMenuItem } from '@security/domain/menu.model';
import { MenuStateService } from '@security/ui/service/menu-state.service';

@Component({
    selector: 'app-hola-mundo',
    standalone: true,
    imports: [CommonModule, BreadcrumbModule, ToolbarModule, ButtonModule, InputTextModule, TableModule, SelectModule],
    templateUrl: './hola-mundo.html',
    styleUrl: './hola-mundo.scss',
})
export class HolaMundo implements OnInit {

    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly menuStateService = inject(MenuStateService);

    breadcrumbHome: PrimeMenuItem = { icon: 'pi pi-home', routerLink: '/' };
    breadcrumbItems: PrimeMenuItem[] = [];

    private menuTree: DomainMenuItem[] = [];

    estadoOptions = [
        { label: 'Todos', value: null },
        { label: 'Activo', value: 'ACTIVO' },
        { label: 'Inactivo', value: 'INACTIVO' }
    ];

    modulos = [
        { id: 101, nombre: 'Seguridad', estado: 'ACTIVO', descripcion: 'Gestión de accesos y perfiles' },
        { id: 102, nombre: 'Créditos', estado: 'ACTIVO', descripcion: 'Gestión de créditos' },
        { id: 103, nombre: 'Cartera', estado: 'INACTIVO', descripcion: 'Gestión de cartera' },
        { id: 104, nombre: 'Contabilidad', estado: 'ACTIVO', descripcion: 'Procesos contables' },
        { id: 105, nombre: 'Reportes', estado: 'ACTIVO', descripcion: 'Reportes y análisis' }
    ];

    ngOnInit(): void {
        this.menuStateService.menuItems$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((menu) => {
                this.menuTree = menu || [];
                this.updateBreadcrumb(this.router.url);
            });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((event) => {
                const nav = event as NavigationEnd;
                this.updateBreadcrumb(nav.urlAfterRedirects || nav.url);
            });
    }

    private updateBreadcrumb(url: string) {
        const cleanUrl = this.normalizeUrl(url);
        const path = this.findPath(this.menuTree, cleanUrl);

        if (path && path.length) {
            this.breadcrumbItems = this.buildBreadcrumb(path);
        }
    }

    private findPath(items: DomainMenuItem[], url: string): DomainMenuItem[] | null {
        for (const item of items || []) {
            const children = item.items || [];
            const itemRoute = this.getItemRoute(item);

            if (itemRoute && this.matchRoute(url, itemRoute)) {
                return [item];
            }

            if (children.length) {
                const childPath = this.findPath(children, url);
                if (childPath) {
                    return [item, ...childPath];
                }
            }
        }
        return null;
    }

    private getItemRoute(item: DomainMenuItem): string | null {
        const itemAny = item as unknown as { routerLink?: string | string[] };
        const routerLink = itemAny.routerLink;

        if (Array.isArray(routerLink)) {
            return routerLink[0] || null;
        }

        if (typeof routerLink === 'string') {
            return routerLink;
        }

        return item.route || null;
    }

    private buildBreadcrumb(path: DomainMenuItem[]): PrimeMenuItem[] {
        let currentRoute = '';

        return path.map((item) => {
            const itemRoute = this.getItemRoute(item);

            if (itemRoute) {
                if (itemRoute.startsWith('/')) {
                    currentRoute = itemRoute;
                } else {
                    currentRoute = this.joinRoutes(currentRoute, itemRoute);
                }
            }

            return {
                label: item.label,
                routerLink: currentRoute || undefined
            } as PrimeMenuItem;
        });
    }

    private joinRoutes(base: string, segment: string): string {
        const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
        const cleanSegment = segment.startsWith('/') ? segment.slice(1) : segment;

        if (!cleanBase) {
            return '/' + cleanSegment;
        }

        return cleanBase + '/' + cleanSegment;
    }

    private matchRoute(url: string, route: string): boolean {
        if (!route) {
            return false;
        }

        const cleanUrl = this.normalizeUrl(url);
        const cleanRoute = this.normalizeRoute(route);

        if (cleanUrl === cleanRoute || cleanUrl.startsWith(cleanRoute + '/')) {
            return true;
        }

        if (!route.startsWith('/')) {
            return cleanUrl === '/' + route || cleanUrl.endsWith('/' + route);
        }

        return false;
    }

    private normalizeUrl(url: string): string {
        return url.split('?')[0].split('#')[0];
    }

    private normalizeRoute(route: string): string {
        let clean = route.split('?')[0].split('#')[0];
        if (!clean.startsWith('/')) {
            clean = '/' + clean;
        }
        return clean;
    }
}
