import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TableComponent, TableItem } from '@security/ui/components/table/table';
import { FormDialogComponent, FormDialogField } from '@security/ui/components/form-dialog/form-dialog';
import { PageHeroComponent } from '@shared/ui/components/page-hero/page-hero';
import { SearchPanelComponent, SearchFieldConfig } from '@security/ui/components/search-panel/search-panel';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ModuloInputPort } from '@security/application/port/input/modulo-input-port';
import { MODULO_INPUT_PORT } from '@security/application/port/input/modulo-input.token';
import { Modulo } from '@security/domain/modulo.model';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableComponent, FormDialogComponent, SearchPanelComponent, ConfirmDialog, PageHeroComponent],
  templateUrl: './modulo.html',
  styleUrl: './modulo.scss',
  providers: [ConfirmationService]
})
export class ModuloPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly moduloInputPort = inject<ModuloInputPort>(MODULO_INPUT_PORT);
  private readonly confirmationService = inject(ConfirmationService);

  readonly form = this.fb.nonNullable.group({
    id: [null as number | null],
    nombre: ['', [Validators.required]]
  });

  readonly searchForm = this.fb.nonNullable.group({
    id: ['']
  });

  readonly searchFields: SearchFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1', type: 'number' }
  ];

  readonly formFields: FormDialogField[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Seguridad',
      errorMessage: 'El nombre es obligatorio.'
    }
  ];

  modulos: TableItem[] = [];
  createdModulo: Modulo | null = null;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  isLoading = false;
  showFormDialog = false;

  get nombreControl() {
    return this.form.controls.nombre;
  }

  get nombreInvalid(): boolean {
    return this.nombreControl.invalid && (this.nombreControl.dirty || this.nombreControl.touched);
  }

  ngOnInit(): void {
    this.loadModulos();
  }

  async loadModulos(): Promise<void> {
    this.errorMessage = '';
    this.isLoading = true;

    try {
      const data = await this.moduloInputPort.obtenerTodas();
      this.modulos = data;
    } catch (error) {
      this.errorMessage = error instanceof Error
        ? error.message
        : 'No se pudieron cargar los módulos.';
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';
    this.createdModulo = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { id, nombre } = this.form.getRawValue();
    const nombreTrim = nombre.trim();

    if (!nombreTrim) {
      this.errorMessage = 'El nombre del módulo es obligatorio.';
      return;
    }

    this.isSubmitting = true;

    const isUpdate = !!id;

    try {
      if (isUpdate) {
        const moduloActualizado = await this.moduloInputPort.actualizar(id, { nombre: nombreTrim });
        this.createdModulo = moduloActualizado;
        this.successMessage = 'Módulo actualizado correctamente.';
        this.form.patchValue({
          id: moduloActualizado.id ?? id,
          nombre: moduloActualizado.nombre
        });
        this.showFormDialog = false;
      } else {
        const moduloCreado = await this.moduloInputPort.crear({ nombre: nombreTrim });
        this.createdModulo = moduloCreado;
        this.successMessage = 'Módulo creado correctamente.';
        this.form.reset({ id: null, nombre: '' });
      }

      await this.loadModulos();
    } catch (error) {
      this.errorMessage = error instanceof Error
        ? error.message
        : isUpdate ? 'No se pudo actualizar el módulo.' : 'No se pudo crear el módulo.';

      if (isUpdate) {
        this.showFormDialog = false;
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  async buscarPorId(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    const idRaw = this.searchForm.getRawValue().id.trim();
    if (!idRaw) {
      this.errorMessage = 'El ID es obligatorio para buscar.';
      return;
    }

    const id = Number(idRaw);
    if (Number.isNaN(id)) {
      this.errorMessage = 'El ID debe ser numérico.';
      return;
    }

    this.isLoading = true;

    try {
      const encontrado = await this.moduloInputPort.buscarPorId(id);
      this.modulos = [encontrado];
      this.successMessage = 'Módulo encontrado correctamente.';
    } catch (error) {
      this.modulos = [];
      this.errorMessage = error instanceof Error
        ? error.message
        : 'No se encontró un módulo con ese ID.';
    } finally {
      this.isLoading = false;
    }
  }

  limpiarBusqueda(): void {
    this.searchForm.reset({ id: '' });
    this.loadModulos();
    this.errorMessage = '';
    this.successMessage = '';
  }

  edit(modulo: TableItem): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.createdModulo = null;
    const parsedId = typeof modulo.id === 'number'
      ? modulo.id
      : modulo.id
        ? Number(modulo.id)
        : null;
    this.form.patchValue({
      id: Number.isFinite(parsedId as number) ? (parsedId as number) : null,
      nombre: modulo.nombre
    });
    this.showFormDialog = true;
  }

  confirmRemove(modulo: TableItem): void {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar el módulo "${modulo.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
      accept: () => this.remove(modulo)
    });
  }

  async remove(modulo: TableItem): Promise<void> {
    const rawId = modulo.id;
    const parsedId = typeof rawId === 'number' ? rawId : rawId ? Number(rawId) : NaN;
    if (!Number.isFinite(parsedId)) {
      this.errorMessage = 'El módulo seleccionado no tiene id válido.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    try {
      await this.moduloInputPort.eliminar(parsedId);
      await this.loadModulos();
      this.successMessage = 'Módulo eliminado correctamente.';
      if (this.form.getRawValue().id === parsedId) {
        this.reset();
      }
    } catch (error) {
      this.errorMessage = error instanceof Error
        ? error.message
        : 'No se pudo eliminar el módulo.';
    } finally {
      this.isSubmitting = false;
    }
  }

  reset(): void {
    this.form.reset({ id: null, nombre: '' });
    this.createdModulo = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  openCreateDialog(): void {
    this.reset();
    this.showFormDialog = true;
  }
}
