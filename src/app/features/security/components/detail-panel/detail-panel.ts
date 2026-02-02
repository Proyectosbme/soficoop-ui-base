import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export interface DetailFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
}

@Component({
  selector: 'app-detail-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './detail-panel.html',
  styleUrl: './detail-panel.scss'
})
export class DetailPanelComponent {
  @Input() title = 'Detalle';
  @Input() subtitle = '';
  @Input() form!: FormGroup;
  @Input() fields: DetailFieldConfig[] = [];
  @Input() showActions = false;
  @Input() readonly = false;
}
