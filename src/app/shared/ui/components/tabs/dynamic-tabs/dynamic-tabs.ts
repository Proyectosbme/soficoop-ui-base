import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTab } from '../ui-tab.model';
import { TabsModule } from 'primeng/tabs';


@Component({
    selector: 'app-dynamic-tabs',
    standalone: true,
    imports: [CommonModule, TabsModule],
    templateUrl: './dynamic-tabs.html',
    styleUrl: './dynamic-tabs.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTabs {

    @Input() tabs: UiTab[] = [];

    @Input() activeValue?: string;

    /** templates por tab */
    @Input() templates!: Record<string, TemplateRef<any>>;

    @Output() tabChange = new EventEmitter<UiTab>();

    onTabChange(value: string | number | undefined) {
        if (value == null) {
            return;
        }

        const selected = this.tabs.find(t => t.value === String(value));
        if (selected) {
            this.tabChange.emit(selected);
        }
    }

}
