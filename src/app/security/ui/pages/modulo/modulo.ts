import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TableComponent, TableItem } from '@security/ui/components/table/table';
import { FormDialogComponent, FormDialogField } from '@security/ui/components/form-dialog/form-dialog';
import { PageHeroComponent } from '@shared/ui/components/page-hero/page-hero';
import { SearchPanelComponent, SearchFieldConfig } from '@security/ui/components/search-panel/search-panel';
import { DetailPanelComponent, DetailFieldConfig } from '@security/ui/components/detail-panel/detail-panel';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModuloInputPort } from '@security/application/port/input/modulo-input-port';
import { MODULO_INPUT_PORT } from '@security/application/port/input/modulo-input.token';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableComponent, FormDialogComponent, SearchPanelComponent, DetailPanelComponent, ConfirmDialog, ToastModule, PageHeroComponent],
  templateUrl: './modulo.html',
  styleUrl: './modulo.scss',
  providers: [ConfirmationService, MessageService]
})
export class ModuloPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly moduloInputPort = inject<ModuloInputPort>(MODULO_INPUT_PORT);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly form = this.fb.nonNullable.group({
    id: [null as number | null],
    nombre: ['', [Validators.required]]
  });

  readonly searchForm = this.fb.nonNullable.group({
    id: [''],
    nombre:['']
  });

  readonly detailForm = this.fb.nonNullable.group({
    id: [''],
    nombre: ['']
  });

  readonly searchFields: SearchFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1', type: 'number' },
    { name: 'nombre', label: 'Nombre', placeholder: 'Ej: Seguridad', type: 'text' },
    { name: 'id', label: 'ID', placeholder: 'Ej: 1', type: 'number' },

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

  readonly detailFields: DetailFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1', type: 'text', readonly: false },
    { name: 'nombre', label: 'Nombre', placeholder: 'Ej: Seguridad', type: 'text', readonly: false }
  ];

  modulos: TableItem[] = [];
  selectedModulo: TableItem | null = null;
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
    this.isLoading = true;

    try {
      const data = await this.moduloInputPort.obtenerTodas();
      this.modulos = data;
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'No se pudieron cargar los módulos.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Completa los campos obligatorios.' });
      return;
    }

    const { id, nombre } = this.form.getRawValue();
    const nombreTrim = nombre.trim();

    if (!nombreTrim) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El nombre del módulo es obligatorio.' });
      return;
    }

    this.isSubmitting = true;

    const isUpdate = !!id;

    try {
      if (isUpdate) {
        const moduloActualizado = await this.moduloInputPort.actualizar(id, { nombre: nombreTrim });
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Módulo actualizado correctamente.' });
        this.form.patchValue({
          id: moduloActualizado.id ?? id,
          nombre: moduloActualizado.nombre
        });
        this.showFormDialog = false;
      } else {
        const moduloCreado = await this.moduloInputPort.crear({ nombre: nombreTrim });
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Módulo creado correctamente.' });
        this.form.reset({ id: null, nombre: '' });
      }

      await this.loadModulos();
    } catch (error) {
      const detail = error instanceof Error
        ? error.message
        : isUpdate ? 'No se pudo actualizar el módulo.' : 'No se pudo crear el módulo.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });

      if (isUpdate) {
        this.showFormDialog = false;
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  async buscarPorId(): Promise<void> {
    const idRaw = this.searchForm.getRawValue().id.trim();
    const nom = this.searchForm.getRawValue().nombre.trim();
    if (!idRaw) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El ID es obligatorio para buscar.' });
      return;
    }
if (!nom) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El nombre es obligatorio para buscar.' });
      return;
    }


    const id = Number(idRaw);
    if (Number.isNaN(id)) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El ID debe ser numérico.' });
      return;
    }

    this.isLoading = true;

    try {
      const encontrado = await this.moduloInputPort.buscarPorId(id);
      this.modulos = [encontrado];
      this.messageService.add({ severity: 'success', summary: 'Encontrado', detail: 'Módulo encontrado correctamente.' });
    } catch (error) {
      this.modulos = [];
      const detail = error instanceof Error ? error.message : 'No se encontró un módulo con ese ID.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.isLoading = false;
    }
  }

  limpiarBusqueda(): void {
    this.searchForm.reset({ id: '' });
    this.loadModulos();
    this.detailForm.reset({ id: '', nombre: '' });
    this.selectedModulo = null;
  }

  selectModulo(modulo: TableItem): void {
    this.selectedModulo = modulo;
    const parsedId = typeof modulo.id === 'number'
      ? modulo.id
      : modulo.id
        ? Number(modulo.id)
        : null;
    this.detailForm.patchValue({
      id: Number.isFinite(parsedId as number) ? String(parsedId) : '',
      nombre: modulo.nombre ?? ''
    });
  }

  edit(modulo: TableItem): void {
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
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El módulo seleccionado no tiene id válido.' });
      return;
    }
    this.isSubmitting = true;

    try {
      await this.moduloInputPort.eliminar(parsedId);
      await this.loadModulos();
      this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Módulo eliminado correctamente.' });
      if (this.detailForm.getRawValue().id === String(parsedId)) {
        this.detailForm.reset({ id: '', nombre: '' });
        this.selectedModulo = null;
      }
      if (this.form.getRawValue().id === parsedId) {
        this.reset();
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'No se pudo eliminar el módulo.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.isSubmitting = false;
    }
  }

  reset(): void {
    this.form.reset({ id: null, nombre: '' });
  }

  openCreateDialog(): void {
    this.reset();
    this.showFormDialog = true;
  }
}
