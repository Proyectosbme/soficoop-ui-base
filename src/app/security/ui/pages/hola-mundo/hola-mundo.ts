import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTabs } from '@shared/ui/components/tabs/dynamic-tabs/dynamic-tabs';
import { UiTab } from '@shared/ui/components/tabs/ui-tab.model';

@Component({
    selector: 'app-hola-mundo',
    standalone: true,
    imports: [CommonModule, DynamicTabs],
    templateUrl: './hola-mundo.html',
    styleUrl: './hola-mundo.scss',
})
export class HolaMundo implements AfterViewInit {

    // 🔹 Definición de tabs
    tabs: UiTab[] = [
        { value: 'uno', title: 'Busqueda' },
        { value: 'dos', title: 'Detalle' }
    ];

    activeTab = 'uno';

    // 🔹 Templates
    @ViewChild('tabUnoTpl') tabUnoTpl!: TemplateRef<any>;
    @ViewChild('tabDosTpl') tabDosTpl!: TemplateRef<any>;

    tabTemplates!: Record<string, TemplateRef<any>>;

    ngAfterViewInit(): void {
        this.tabTemplates = {
            uno: this.tabUnoTpl,
            dos: this.tabDosTpl,
        };
    }

    onTabChange(tab: UiTab) {
        this.activeTab = tab.value;
        console.log('Tab activo:', tab.value);
    }
}
