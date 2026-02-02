// Angular core y módulos base.
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// UI de PrimeNG.
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// Componentes reutilizables de la capa UI (standalone).
// Se importan aquí para poder usarlos en el template (perfil.html).
import { SearchPanelComponent, SearchFieldConfig } from '@security/ui/components/search-panel/search-panel';
import { TableComponent, TableItem } from '@security/ui/components/table/table';
import { FormDialogComponent, FormDialogField } from '@security/ui/components/form-dialog/form-dialog';
import { PageHeroComponent } from '@shared/ui/components/page-hero/page-hero';

// Puertos de la capa de aplicación (inyección por token).
import { PERFIL_INPUT_PORT } from '@security/application/port/input/perfil-input.token';
import { PerfilInputPort } from '@security/application/port/input/perfil-input-port';

// Modelo de dominio.
import { Perfil } from '@security/domain/perfil.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  // Aquí se registran los módulos/componentes que usará el template.
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialog, SearchPanelComponent, TableComponent, FormDialogComponent, PageHeroComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  providers: [ConfirmationService]
})
export class PerfilPage {
  // Inyección de dependencias.
  private readonly fb = inject(FormBuilder);
  private readonly perfilInputPort = inject<PerfilInputPort>(PERFIL_INPUT_PORT);
  private readonly confirmationService = inject(ConfirmationService);

  // Formulario principal del perfil.
  readonly form = this.fb.nonNullable.group({
    id: [''],
    nombre: ['', [Validators.required]]
  });

  // Formulario de búsqueda.
  readonly searchForm = this.fb.nonNullable.group({
    id: ['']
  });

  // Configuración dinámica del panel de búsqueda.
  readonly searchFields: SearchFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1' , type: 'number' }
  ];

  // Configuración dinámica del formulario en el diálogo.
  readonly formFields: FormDialogField[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Administrador',
      errorMessage: 'El nombre es obligatorio.'
    }
  ];

  // Estado de la vista.
  perfiles: TableItem[] = [];
  showFormDialog = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  // Helper para validar el campo nombre.
  get nombreInvalid(): boolean {
    const control = this.form.controls.nombre;
    return control.invalid && (control.dirty || control.touched);
  }

  // Busca un perfil por ID y nombre (según la lógica actual).
  async buscarPorId(): Promise<void> {
    this.clearMessages();
    const id = this.searchForm.getRawValue().id.trim();
    if (!id) {
      this.errorMessage = 'El ID es obligatorio para buscar.';
      return;
    }

    try {
      const perfil = await this.perfilInputPort.buscarPorId(id);
      this.perfiles = [perfil];
      this.successMessage = 'Perfil encontrado correctamente.';
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No se pudo encontrar el perfil.';
    }
  }

  limpiarBusqueda(): void {
    this.clearMessages();
    this.searchForm.reset({ id: '' });
    this.perfiles = [];
  }

  // Abre el diálogo en modo creación.
  openCreateDialog(): void {
    this.clearMessages();
    this.form.reset({ id: '', nombre: '' });
    this.searchForm.reset({ id: '' });
    this.showFormDialog = true;
  }

  // Abre el diálogo en modo edición.
  edit(perfil: TableItem): void {
    this.clearMessages();
    const idValue = perfil.id != null ? String(perfil.id) : '';
    this.form.patchValue({ id: idValue, nombre: perfil.nombre });
    this.searchForm.patchValue({ id: idValue });
    this.showFormDialog = true;
  }

  // Envía el formulario para crear o actualizar.
  async onSubmit(): Promise<void> {
    this.clearMessages();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { id, nombre } = this.form.getRawValue();
    const nombreTrim = nombre.trim();

    if (!nombreTrim) {
      this.errorMessage = 'El nombre del perfil es obligatorio.';
      return;
    }

    this.isSubmitting = true;

    const isUpdate = !!id;

    try {
      if (isUpdate) {
        const actualizado = await this.perfilInputPort.actualizar(id, { nombre: nombreTrim });
        this.addOrUpdateLocal(actualizado);
        this.successMessage = 'Perfil actualizado con éxito.';
        this.showFormDialog = false;
      } else {
        const creado = await this.perfilInputPort.crear({ nombre: nombreTrim });
        this.addOrUpdateLocal(creado);
        this.successMessage = 'Perfil creado con éxito.';
        this.form.reset({ id: '', nombre: '' });
        this.searchForm.reset({ id: '' });
      }
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : isUpdate ? 'No se pudo actualizar el perfil.' : 'No se pudo crear el perfil.';
      if (isUpdate) {
        this.showFormDialog = false;
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  confirmRemove(perfil: TableItem): void {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar el perfil "${perfil.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
      accept: () => this.remove(perfil)
    });
  }

  async remove(perfil: TableItem): Promise<void> {
    const idValue = perfil.id != null ? String(perfil.id) : '';
    if (!idValue) {
      this.errorMessage = 'El perfil seleccionado no tiene id válido.';
      return;
    }

    this.clearMessages();
    this.isSubmitting = true;

    try {
      await this.perfilInputPort.eliminar(idValue);
      this.perfiles = this.perfiles.filter((p) => String(p.id ?? '') !== idValue);
      this.successMessage = 'Perfil eliminado correctamente.';
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No se pudo eliminar el perfil.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private addOrUpdateLocal(perfil: Perfil): void {
    const idx = this.perfiles.findIndex((p) => p.id === perfil.id);
    if (idx >= 0) {
      this.perfiles[idx] = perfil;
    } else {
      this.perfiles = [...this.perfiles, perfil];
    }
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
