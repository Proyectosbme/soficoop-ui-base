import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { UserMenuComponent } from './user.menu.component';
import { NotificationService } from '../service/notification.service';
import { Observable, Subscription } from 'rxjs';
import { Badge } from 'primeng/badge';
import { Popover } from 'primeng/popover';
import { NotificationsComponent } from './notifications.component';
import { QuickNavService, QuickNavState } from '@shared/ui/services/quick-nav.service';
import { AppBreadcrumb } from './breadcrumb/app.breadcrumb';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, UserMenuComponent, Badge, Popover, NotificationsComponent, AppBreadcrumb],
    templateUrl: './app.topbar.component.html'
})
export class AppTopbar implements OnInit, OnDestroy {
    items!: MenuItem[];

    unreadCount: number = 0;

    private subscription!: Subscription;
    quickNav$!: Observable<QuickNavState>;

    @ViewChild('notificationspanel') notificationsPanel!: any;
    
    constructor(
        public layoutService: LayoutService,
        private notificationService: NotificationService,
        private quickNavService: QuickNavService
    ) {
        this.quickNav$ = this.quickNavService.state$;
    }

    ngOnInit() {
        this.subscription = this.notificationService.unreadCount$.subscribe(count => {
            this.unreadCount = count;
        });
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
