import { Component, HostBinding, Input, OnInit, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-menuitem]',
    standalone: true,   // 👈 ESTO ES OBLIGATORIO
    imports: [CommonModule, RouterModule, RippleModule],
    templateUrl: './app.menuitem.component.html',
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0',
                overflow: 'hidden',
                visibility: 'hidden'
            })
            ),
            state('expanded', style({
                height: '*',
                overflow: 'hidden',
                visibility: 'visible'
            })
            ),
            transition('collapsed <=> expanded', animate('0ms'))
        ])
    ],
    providers: [LayoutService]
})
export class AppMenuitem implements OnInit {
    @Input() item!: MenuItem;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    active = false;

    key: string = '';

    private readonly destroyRef = inject(DestroyRef);

    constructor(
        public router: Router,
        private layoutService: LayoutService
    ) {
        this.layoutService.menuSource$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => {
                Promise.resolve(null).then(() => {
                    if (value.routeEvent) {
                        this.active = value.key === this.key || value.key.startsWith(this.key + '-') ? true : false;
                    } else {
                        if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                            this.active = false;
                        }
                    }
                });
            });

        this.layoutService.resetSource$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.active = false;
            });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

        if (activeRoute) {
            this.layoutService.onMenuStateChange({ key: this.key, routeEvent: true });
        }
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // execute command
        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        // toggle active state only when has children
        if (this.hasChildren(this.item)) {
            this.active = !this.active;
        }

        this.layoutService.onMenuStateChange({ key: this.key });
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
    }

    hasChildren(item: MenuItem): boolean {
        return Array.isArray(item.items) && item.items.length > 0;
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active && !this.root;
    }
}
