import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem as DomainMenuItem } from '@security/domain/menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuStateService {
    private readonly menuItemsSubject = new BehaviorSubject<DomainMenuItem[]>([]);

    readonly menuItems$ = this.menuItemsSubject.asObservable();

    setMenu(items: DomainMenuItem[] | null | undefined): void {
        this.menuItemsSubject.next(items ?? []);
    }

    getMenuSnapshot(): DomainMenuItem[] {
        return this.menuItemsSubject.getValue();
    }
}
