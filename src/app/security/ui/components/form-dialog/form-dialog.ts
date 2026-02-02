import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Modulo } from '@security/domain/modulo.model';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, DialogModule],
  templateUrl: './form-dialog.html',
  styleUrl: './form-dialog.scss'
})
export class FormDialogComponent {
  @Input() visible = false;
  @Input() isSubmitting = false;
  @Input() createdModulo: Modulo | null = null;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() form!: FormGroup;
  @Input() headerCreate = 'Crear';
  @Input() headerEdit = 'Editar';
  @Input() subtitle = '';
  @Input() submitCreateLabel = 'Crear';
  @Input() submitUpdateLabel = 'Actualizar';
  @Input() clearLabel = 'Limpiar';
  @Input() dialogClass = 'modulo-dialog';
  @Input() fields: FormDialogField[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Seguridad',
      errorMessage: 'El nombre es obligatorio.'
    }
  ];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() resetForm = new EventEmitter<void>();
}

export interface FormDialogField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
}