import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmptyStateComponent } from '../empty-state/empty-state';

export interface TableItem {
  id?: number | string;
  nombre: string;
  meta?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, EmptyStateComponent],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class TableComponent {
  @Input() items: TableItem[] = [];
  @Input() isLoading = false;
  @Input() showCreate = true;
  @Input() selectedItem: TableItem | null = null;
  @Input() title = 'Listado';
  @Input() totalLabel = 'Total';
  @Input() createLabel = 'Nuevo';
  @Input() emptyTitle = 'Sin registros';
  @Input() emptySubtitle = 'Crea el primer registro para empezar.';
  @Input() metaText = '';

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<TableItem>();
  @Output() remove = new EventEmitter<TableItem>();
  @Output() select = new EventEmitter<TableItem>();

  isSelected(item: TableItem): boolean {
    if (!this.selectedItem) {
      return false;
    }
    if (this.selectedItem.id != null || item.id != null) {
      return this.selectedItem.id === item.id;
    }
    return this.selectedItem === item;
  }
}