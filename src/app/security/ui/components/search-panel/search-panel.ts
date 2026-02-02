import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export interface SearchFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './search-panel.html',
  styleUrl: './search-panel.scss'
})
export class SearchPanelComponent {
  @Input() title = 'Buscar';
  @Input() subtitle = '';
  @Input() icon?: string;
  @Input() form!: FormGroup;
  @Input() fields: SearchFieldConfig[] = [];
  @Input() searchLabel = 'Buscar';
  @Input() clearLabel = 'Limpiar';
  @Input() showClear = true;

  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}
